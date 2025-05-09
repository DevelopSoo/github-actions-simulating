// src/services/UserPostService.test.tsx
import { getUserPosts } from "./UserPostService";

// __mocks__ 폴더 대신 직접 모킹
jest.mock("./UserService", () => ({
  getUser: jest.fn().mockImplementation((id: number) => {
    return Promise.resolve({
      id,
      name: "김철수",
      email: "kim@example.com",
    });
  }),
}));

test("인라인 모킹이 잘 적용되는지 확인", async () => {
  const posts = await getUserPosts(1);

  expect(posts).toEqual([
    {
      id: 1,
      title: "Post 1",
      body: "Body 1",
      userId: 1,
      name: "김철수",
    },
  ]);
});
