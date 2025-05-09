import { server } from "@/mocks/server";
import { fetchUsers, getUser } from "./sum";
import { http, HttpResponse } from "msw";

test("fetchUsers 함수가 사용자 데이터를 반환해야 함", async () => {
  const result = await fetchUsers();
  expect(result).toEqual([
    { id: 1, name: "김철수", email: "kim@example.com" },
    { id: 2, name: "이영희", email: "lee@example.com" },
  ]);
});

test("fetchUsers 함수가 에러를 반환해야 함", async () => {
  server.use(
    http.get("https://jsonplaceholder.typicode.com/users", () => {
      return HttpResponse.error();
    }),
  );
  await expect(fetchUsers()).rejects.toThrow("알 수 없는 에러가 발생했습니다.");
});

test("성공적인 API 호출 시 사용자 데이터를 반환해야 함", async () => {
  const result = await getUser(1);
  expect(result).toEqual({
    id: 1,
    name: "김철수",
    email: "kim@example.com",
  });
});

test("API 호출 실패 시 에러를 반환해야 함", async () => {
  server.use(
    http.get("https://jsonplaceholder.typicode.com/users/1", () => {
      // 백엔드에서 반환하는 값은 없고 (null)
      // 상태 코드가 500으로 반환 -> catch 블록으로 이동
      return HttpResponse.json(null, { status: 500 });
    }),
  );
  await expect(getUser(1)).rejects.toThrow(
    "유저 정보를 불러오는데 실패했습니다.",
  );
});
