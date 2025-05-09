"use client";

import { useQuery } from "@tanstack/react-query";

export const useFetchPosts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("/api/posts");
      if (!res.ok) {
        throw new Error("데이터 패치 실패");
      }
      return res.json();
    },
  });

  return { data, isLoading, error };
};
