import { useMutation, useQueryClient } from "@tanstack/react-query";
import PostForm from "./PostForm";
import { createPost } from "../api/posts";
import { useCreatePost } from "../hooks/createPostHook";

const AddPost = () => {
  const { mutate, isLoading, isError: isCreateBookError } = useCreatePost();

  const handleCreatePost = (post) => {
    mutate({
      id: Date.now().toString(),
      ...post,
    });
  };

  return (
    <div>
      {/* <h1>Add new Post</h1> */}
      <PostForm
        initialValue={{}}
        onSubmit={handleCreatePost}
        loadingState={false}
      ></PostForm>
    </div>
  );
};

export default AddPost;
