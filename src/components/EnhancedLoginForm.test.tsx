// src/components/EnhancedLoginForm.test.tsx (userEvent 버전)

import { render, screen } from "@testing-library/react";
import EnhancedLoginForm from "./EnhancedLoginForm";
import userEvent from "@testing-library/user-event";

test("키보드로 폼 탐색 및 제출 테스트 (userEvent 방식)", async () => {
  // userEvent 설정
  const user = userEvent.setup();

  render(<EnhancedLoginForm />);

  // alert 모킹 설정
  const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

  // 이메일 필드 입력
  const emailInput = screen.getByLabelText("이메일:");
  await user.type(emailInput, "test@test.com");

  // Tab 키로 다음 필드로 이동
  await user.tab();

  // 비밀번호 필드가 포커스 되어 있는지 확인
  const passwordInput = screen.getByLabelText("비밀번호:");
  expect(passwordInput).toHaveFocus();

  // 비밀번호 입력
  await user.type(passwordInput, "password123");

  // Tab 키로 체크박스로 이동하고 스페이스바로 선택
  await user.tab();
  await user.keyboard(" "); // 스페이스바로 체크박스 토글

  // Tab 키로 제출 버튼으로 이동하고 엔터로 제출
  await user.tab();
  await user.keyboard("{Enter}"); // 엔터 키로 폼 제출

  // 폼이 제대로 제출되었는지 확인
  expect(alertSpy).toHaveBeenCalledWith(
    "로그인 정보: test@test.com, password123, 기억하기: true",
  );

  alertSpy.mockRestore();
});
