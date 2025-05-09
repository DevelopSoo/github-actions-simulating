import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { fireEvent } from "@testing-library/react";

test("로그인 버튼을 클릭하면 로그인 메시지가 출력되는지 확인", () => {
  render(<LoginForm />);

  const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

  // 입력 요소 가져오기
  const emailInput = screen.getByRole("textbox", { name: "이메일:" });
  const passwordInput = screen.getByLabelText("비밀번호:");

  // 이메일과 비밀번호 입력
  fireEvent.change(emailInput, { target: { value: "test@test.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  // 입력값 확인
  expect(emailInput).toHaveValue("test@test.com");
  expect(passwordInput).toHaveValue("password123");

  // 폼 제출
  const form = screen.getByRole("form");
  fireEvent.submit(form);
  // 로그인 버튼 클릭 시 로그인 메시지가 출력되는지 확인
  expect(alertSpy).toHaveBeenCalledWith(
    "로그인 성공 test@test.com password123",
  );

  // jest.spyOn()으로 생성된 스파이(spy)를 원래 구현(original implementation)으로 완전히 복원하는 역할
  alertSpy.mockRestore();
});
