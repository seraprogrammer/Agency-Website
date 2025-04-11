import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ handleCreatePost, isAdmin }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postImage, setPostImage] = useState("");
  const [newPost, setNewPost] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const createPost = async () => {
    if (!postTitle.trim()) {
      alert("Please add a title for your post");
      return;
    }

    if (newPost.trim()) {
      setIsSubmitting(true);
      await handleCreatePost(postTitle, postImage, newPost);
      setIsSubmitting(false);
      navigate("/");
    } else {
      alert("Post content cannot be empty");
    }
  };

  if (!isAdmin) {
    navigate("/");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Create New Post</h1>
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to posts
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="mb-6">
            <label
              htmlFor="post-title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Post Title *
            </label>
            <input
              id="post-title"
              type="text"
              placeholder="Enter a compelling title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="post-image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Featured Image URL (optional)
            </label>
            <input
              id="post-image"
              type="text"
              placeholder="https://example.com/image.jpg"
              value={postImage}
              onChange={(e) => setPostImage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
            />
            {postImage && (
              <div className="mt-2 relative h-40 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={postImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/640x360?text=Invalid+Image+URL";
                  }}
                />
              </div>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="post-content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Post Content *
            </label>
            <textarea
              id="post-content"
              rows="12"
              placeholder="Write your post content here..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={createPost}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Publishing...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Publish Post
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
