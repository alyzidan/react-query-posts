import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Post = {
  id: string | number;
  title: string;
  body: string;
};

export type PostParams = {
  id: string | number;
};

const CREATE_BOOK_QUERY_KEY = ["post"];
// const queryClient = useQueryClient();

const createPost = async (postData: Post): Promise<any> => {
  const response = await fetch(`http://localhost:3000/posts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  const data = await response.json();
  return data;
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<Post, Error, Post>({
    mutationFn: createPost,
    onSuccess: () => {
      // invalidate the query cache for 'books'
      queryClient.invalidateQueries(CREATE_BOOK_QUERY_KEY);
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
};
