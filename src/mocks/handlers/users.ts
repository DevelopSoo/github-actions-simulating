import { http, HttpResponse } from "msw";

export const usersHandlers = [
  http.get("https://jsonplaceholder.typicode.com/users", () => {
    return HttpResponse.json([
      { id: 1, name: "김철수", email: "kim@example.com" },
      { id: 2, name: "이영희", email: "lee@example.com" },
    ]);
  }),
  http.get("https://jsonplaceholder.typicode.com/users/:id", ({ params }) => {
    return HttpResponse.json({
      id: Number(params.id),
      name: "김철수",
      email: "kim@example.com",
    });
  }),
];
