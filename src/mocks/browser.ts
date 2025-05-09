// /src/mocks/browser.ts
import { setupWorker } from "msw/browser";
import { postsHandlers } from "@/mocks/handlers/posts";
import { usersHandlers } from "@/mocks/handlers/users";

// 브라우저에서 MSW 실행
export const worker = setupWorker(...postsHandlers, ...usersHandlers);
