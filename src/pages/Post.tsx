import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import { fetchPost } from "../api/posts";
import { useNavigate } from "react-router-dom";

import { PostParams, useGetSinglePost } from "../hooks/getPostHook";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: post,
    isLoading,
    isError,
    error,
    refetch: refetchUserData,
  } = useGetSinglePost({ id } as PostParams, false);

  if (isError) return <div>`Error ${error.message}`</div>;
  if (isLoading) return <div>`...Loading`</div>;
  return (
    <>
      <div>
        <button onClick={() => refetchUserData()}>fetch user data</button>
        <h2>{post?.title}</h2>
        <h2>{post?.body}</h2>
        <button onClick={() => navigate(`/`)}>Go to Main</button>
      </div>
    </>
  );
};
export default Post;
