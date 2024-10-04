import React from "react";
import AddPost from "../components/AddPost";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";
import { IPost } from "../components/PostForm";
import { useNavigate } from "react-router-dom";
import { useDeletePost } from "../hooks/deletePostHook";

const PostsLists = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const {
    mutate,
    isLoading: isCreateBookLoading,
    isError: isCreateBookError,
  } = useDeletePost();

  const handleDeletePost = (id) => {
    mutate({
      id,
    });
  };
  if (isLoading) return "...Loading";
  if (isError) return `error : ${error.message}`;

  return (
    <>
      <h1 className="text-3xl text-center font-bold mb-2">Hello world!</h1>

      <AddPost></AddPost>

      {posts.reverse().map((post: IPost) => (
        <div key={post.id}>
          <div
            onClick={() => navigate(`post/${post.id}`)}
            className="mb-9 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src="https://flowbite.com/docs/images/blog/image-4.jpg"
              alt=""
            ></img>
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Post: {post.title}{" "}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {post.body}
              </p>
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit
                </a>
                <button onClick={() => handleDeletePost(post.id?.toString())}>
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* <h1 onClick={() => navigate(`post/${post.id}`)}></h1> */}

          {/* <button onClick={() => navigate(`post/${post.id}/edit`)}>Edit</button> */}
        </div>
      ))}
    </>
  );
};
export default PostsLists;
