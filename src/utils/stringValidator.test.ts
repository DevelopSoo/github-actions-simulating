// src/utils/stringValidator.test.ts
import { validateUsername } from "./stringValidator";

test("유효한 사용자 이름", () => {
  expect(validateUsername("john123")).toBeTruthy();
  expect(validateUsername("user_name")).toBeTruthy();
  expect(validateUsername("ABC123")).toBeTruthy();
});

test("특수문자가 포함된 이름", () => {
  expect(validateUsername("user@name")).toBeFalsy();
  expect(validateUsername("user.name")).toBeFalsy();
  expect(validateUsername("user-name")).toBeFalsy();
});

test("길이 제한 검사", () => {
  expect(validateUsername("ab")).toBeFalsy(); // 3자 미만
  expect(validateUsername("a".repeat(21))).toBeFalsy(); // 20자 초과
});

test("잘못된 입력 타입", () => {
  // @ts-expect-error 타입 체크 무시
  expect(validateUsername(null)).toBeFalsy();
  // @ts-expect-error 타입 체크 무시
  expect(validateUsername(undefined)).toBeFalsy();
  // @ts-expect-error 타입 체크 무시
  expect(validateUsername(123)).toBeFalsy();
});
