// src/hooks/useFetchPosts.test.ts

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useFetchPosts } from "./useFetchPosts";

describe("useFetchPosts 훅 테스트", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  afterEach(() => {
    queryClient.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  test("데이터 패치 테스트", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([
        {
          id: 1,
          title: "리액트를 재밌게 공부하는 법",
          content: "리액트를 재밌게 공부하는 법이란 ~",
        },
        {
          id: 2,
          title: "Next.js를 재밌게 공부하는 법",
          content: "Next.js를 재밌게 공부하는 법이란 ~",
        },
      ]),
    });

    const { result } = renderHook(() => useFetchPosts(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual([
        {
          id: 1,
          title: "리액트를 재밌게 공부하는 법",
          content: "리액트를 재밌게 공부하는 법이란 ~",
        },
        {
          id: 2,
          title: "Next.js를 재밌게 공부하는 법",
          content: "Next.js를 재밌게 공부하는 법이란 ~",
        },
      ]);
    });
  });
});
