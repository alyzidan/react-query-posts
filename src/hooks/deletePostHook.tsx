import { useMutation, useQueryClient } from "@tanstack/react-query";
import PostParams from "./getPostHook";

const CREATE_BOOK_QUERY_KEY = ["post"];

const deletePost = async (post: PostParams): Promise<any> => {
  const response = await fetch(`http://localhost:3000/posts/${post.id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation<Post, Error, Post>({
    mutationFn: deletePost,
    onSuccess: () => {
      // invalidate the query cache for 'books'
      queryClient.invalidateQueries(CREATE_BOOK_QUERY_KEY);
    },
    onError: (error: any) => {
      console.log("Errrr", error);
    },
  });
};
