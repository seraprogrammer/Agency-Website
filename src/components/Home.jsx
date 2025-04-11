import React from "react";
import { Link } from "react-router-dom";

const Home = ({ user, posts, isAdmin, subscriptionValid, canViewFullPost }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
          Premium Blog Platform
        </span>
      </h1>

      {!user ? (
        <div className="bg-white rounded-xl shadow-xl p-10 max-w-2xl mx-auto text-center my-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Welcome to our Premium Blog
          </h2>
          <p className="text-gray-600 mb-8">
            Sign in with your Google account to access premium content and
            exclusive articles
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center mx-auto"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 11V8L16 12L12 16V13H8V11H12Z" fill="currentColor" />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Login with Google
          </button>
        </div>
      ) : (
        <>
          {isAdmin && (
            <div className="mb-8">
              <Link
                to="/create-post"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-200 inline-flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Create New Post
              </Link>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 mr-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              Latest Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    {post.title && (
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        <Link
                          to={`/post/${post.id}`}
                          className="hover:text-blue-600 transition-colors duration-200"
                        >
                          {post.title}
                        </Link>
                      </h3>
                    )}
                    <p className="text-gray-500 text-sm mb-4">
                      <Link
                        to={`/post/${post.id}`}
                        className="flex items-center"
                      >
                        <span className="mr-1">Read article</span>
                        {!canViewFullPost(post.id) && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs py-1 px-2 rounded-full ml-2">
                            Premium
                          </span>
                        )}
                      </Link>
                    </p>
                    {post.author && (
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white mr-2">
                            {post.author.charAt(0)}
                          </div>
                          <span className="text-gray-700 text-sm">
                            {post.author}
                          </span>
                        </div>
                        <span className="text-indigo-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!subscriptionValid && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 mt-10">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    🔑 Unlock Premium Content
                  </h3>
                  <p className="text-gray-600">
                    Subscribe to get unlimited access to all premium articles
                  </p>
                </div>
                <Link
                  to="/subscription"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-medium py-2 px-6 rounded-md shadow-md transition-all duration-200 inline-flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Get Premium Access
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
