import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

// Components
import Home from "./components/Home";
import Login from "./components/Login";
import PostDetail from "./components/PostDetail";
import CreatePost from "./components/CreatePost";
import Subscription from "./components/Subscription";
import Navbar from "./components/Navbar";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCuPfSWJONcXD1jmYcMHizxcyooWZc6y00",
  authDomain: "store-e36c9.firebaseapp.com",
  projectId: "store-e36c9",
  storageBucket: "store-e36c9.firebasestorage.app",
  messagingSenderId: "688140049437",
  appId: "1:688140049437:web:2bbabf1e5070bac4ea7af4",
  measurementId: "G-9FF1E07Y6W",
};

// List of admin emails
const ADMIN_EMAILS = [
  // Add your admin emails here
  "olovajs@gmail.com",
  // You can add more admin emails as needed
];

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const App = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState([]);
  const [subscriptionValid, setSubscriptionValid] = useState(false);
  const [purchasedPosts, setPurchasedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setIsAdmin(data.role === "admin");

          const now = new Date().getTime();
          setSubscriptionValid(
            data.subscriptionEnd && data.subscriptionEnd > now
          );

          // Load purchased posts if any
          if (data.purchasedPosts) {
            setPurchasedPosts(data.purchasedPosts);
          }
        }
      } else {
        setIsAdmin(false);
        setSubscriptionValid(false);
        setPurchasedPosts([]);
      }
      setLoading(false);
    });

    fetchPosts();

    return () => unsubscribe();
  }, []);

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const postList = [];
    querySnapshot.forEach((doc) => {
      postList.push({ id: doc.id, ...doc.data() });
    });
    setPosts(postList);
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userRef = doc(db, "users", result.user.uid);
      const userSnap = await getDoc(userRef);

      // Check if user's email is in the admin list
      const isAdminEmail = ADMIN_EMAILS.includes(result.user.email);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          role: isAdminEmail ? "admin" : "user",
          email: result.user.email,
          subscriptionEnd: 0,
          purchasedPosts: [],
        });
      } else {
        // Update role if user's email is in admin list but not marked as admin yet
        const userData = userSnap.data();
        if (isAdminEmail && userData.role !== "admin") {
          await setDoc(userRef, {
            ...userData,
            role: "admin",
          });
        }
      }

      // Refresh user state
      if (isAdminEmail) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setIsAdmin(false);
    setSubscriptionValid(false);
    setPurchasedPosts([]);
  };

  const handleCreatePost = async (title, imageUrl, content) => {
    if (content.trim()) {
      await addDoc(collection(db, "posts"), {
        title: title,
        content: content,
        imageUrl: imageUrl,
        createdAt: serverTimestamp(),
        author: user.displayName,
        isAdminPost: true,
      });
      fetchPosts();
      return true;
    }
    return false;
  };

  const handleBuySubscription = async () => {
    if (user) {
      const oneWeekLater = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        await setDoc(userRef, {
          ...userData,
          role: isAdmin ? "admin" : "user",
          subscriptionEnd: oneWeekLater,
        });
      } else {
        await setDoc(userRef, {
          role: isAdmin ? "admin" : "user",
          subscriptionEnd: oneWeekLater,
          purchasedPosts: [],
        });
      }

      setSubscriptionValid(true);
    }
  };

  const handleBuySinglePost = async (postId) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const updatedPurchasedPosts = [
          ...(userData.purchasedPosts || []),
          postId,
        ];

        await setDoc(userRef, {
          ...userData,
          purchasedPosts: updatedPurchasedPosts,
        });

        setPurchasedPosts(updatedPurchasedPosts);
      }
    }
  };

  const canViewFullPost = (postId) => {
    return isAdmin || subscriptionValid || purchasedPosts.includes(postId);
  };

  const getContentPreview = (content) => {
    const lines = content.split("\n").filter((line) => line.trim() !== "");
    return lines.slice(0, 3).join("\n");
  };

  const isContentTruncated = (content) => {
    const lines = content.split("\n").filter((line) => line.trim() !== "");
    return lines.length > 3;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} isAdmin={isAdmin} handleLogout={handleLogout} />

        <main className="pb-12">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  user={user}
                  posts={posts}
                  isAdmin={isAdmin}
                  subscriptionValid={subscriptionValid}
                  canViewFullPost={canViewFullPost}
                />
              }
            />
            <Route
              path="/login"
              element={
                user ? <Navigate to="/" /> : <Login handleLogin={handleLogin} />
              }
            />
            <Route
              path="/post/:id"
              element={
                user ? (
                  <PostDetail
                    posts={posts}
                    canViewFullPost={canViewFullPost}
                    getContentPreview={getContentPreview}
                    isContentTruncated={isContentTruncated}
                    handleBuySinglePost={handleBuySinglePost}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/create-post"
              element={
                user && isAdmin ? (
                  <CreatePost
                    handleCreatePost={handleCreatePost}
                    isAdmin={isAdmin}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/subscription"
              element={
                user ? (
                  <Subscription
                    handleBuySubscription={handleBuySubscription}
                    subscriptionValid={subscriptionValid}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">
                  Premium Blog Platform
                </h3>
                <p className="text-gray-400 text-sm">
                  High-quality content worth paying for
                </p>
              </div>
              <div className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Your Company. All rights
                reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
