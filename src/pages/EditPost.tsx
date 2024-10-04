import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { fetchPost, updatePost } from "../api/posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    isError,
    isLoading,
    data: post,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id || ""),
  });
  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
  });
  if (isError) return <div>`Error ${error.message}`</div>;
  if (isLoading) return <div>`...Loading`</div>;
  const handleEditPost = (updatedPost: any) => {
    updatePostMutation.mutate({ id, ...updatedPost });
  };
  return (
    <>
      {/* <div>EditPost {id}</div> */}
      <div className="form">
        <PostForm initialValue={post} onSubmit={handleEditPost}></PostForm>
      </div>
    </>
  );
};
export default EditPost;
