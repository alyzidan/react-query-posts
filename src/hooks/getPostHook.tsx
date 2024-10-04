import { useQuery } from "@tanstack/react-query";

type Post = {
  id: string | number;
  title: string;
  body: string;
};

export type PostParams = {
  id: string | number;
};

const QUERY_KEY = (params: PostParams) => ["post", params.id];

const fetchPost = async (params: PostParams): Promise<Post> => {
  const data = await fetch(`http://localhost:3000/posts/${params.id}`);
  const postData = await data.json();
  return postData;
};
export const useGetSinglePost = (params: PostParams, enabled: boolean) => {
  return useQuery<Post, Error>({
    queryKey: QUERY_KEY(params),
    queryFn: () => fetchPost(params),
    enabled,
  });
};
