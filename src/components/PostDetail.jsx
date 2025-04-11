import React from "react";
import { useParams, Link } from "react-router-dom";

const PostDetail = ({
  posts,
  canViewFullPost,
  getContentPreview,
  isContentTruncated,
  handleBuySinglePost,
}) => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Post not found
        </h2>
        <p className="text-gray-500 mb-6">
          The article you're looking for doesn't exist or has been removed
        </p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors duration-200 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200"
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
        Back to all posts
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {post.imageUrl && (
          <div className="relative h-72 md:h-96 w-full">
            <img
              src={post.imageUrl}
              alt={post.title || "Post image"}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h1 className="text-2xl md:text-4xl font-bold text-white">
                {post.title}
              </h1>
              {post.author && (
                <div className="flex items-center mt-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white mr-2">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm">{post.author}</p>
                    <p className="text-gray-300 text-xs">Author</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!post.imageUrl && (
          <div className="pt-6 px-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {post.title}
            </h1>
            {post.author && (
              <div className="flex items-center mt-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white mr-2">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-gray-800 text-sm">{post.author}</p>
                  <p className="text-gray-500 text-xs">Author</p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="p-6 md:p-8">
          {canViewFullPost(post.id) ? (
            <div className="prose prose-blue max-w-none">
              {post.content.split("\n").map((paragraph, idx) =>
                paragraph.trim() ? (
                  <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ) : (
                  <br key={idx} />
                )
              )}
            </div>
          ) : (
            <div>
              <div className="prose prose-blue max-w-none mb-6">
                {getContentPreview(post.content)
                  .split("\n")
                  .map((paragraph, idx) =>
                    paragraph.trim() ? (
                      <p
                        key={idx}
                        className="mb-4 text-gray-700 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ) : (
                      <br key={idx} />
                    )
                  )}
              </div>
              {isContentTruncated(post.content) && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 my-8 border border-blue-100">
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto text-blue-500 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Premium Content
                    </h3>
                    <p className="text-gray-600 mb-6">
                      This is a preview. Purchase this article to continue
                      reading.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <button
                        onClick={() => handleBuySinglePost(post.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 flex items-center justify-center"
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
                        Unlock This Article
                      </button>
                      <Link
                        to="/subscription"
                        className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-6 rounded-md transition-colors duration-200 flex items-center justify-center"
                      >
                        Get Full Access
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
