import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from ".";

test("Input 컴포넌트 미입력 시 X 버튼이 보이지 않아야 한다.", () => {
  render(<Input />);

  // 1. input 요소를 가져온다
  const input = screen.getByRole("textbox");
  // 2. 버튼을 가져온다 -> 없어도 에러가 안나는 코드
  const deleteButton = screen.queryByRole("button", { name: "입력값 지우기" });

  // 3. input에 아무것도 입력되지 않았는지 확인
  expect(input).toHaveValue("1");
  // 4. 버튼이 안보이는지 확인
  expect(deleteButton).not.toBeInTheDocument();
});

test("Input 컴포넌트 입력값이 있을 때 X 버튼이 보여야 한다.", () => {
  render(<Input defaultValue="입력값" />);

  // 1. input 요소를 가져온다
  const input = screen.getByRole("textbox");
  // 2. 버튼을 가져온다 -> 없어도 에러가 안나는 코드
  const deleteButton = screen.queryByRole("button", { name: "입력값 지우기" });

  // 3. input에 입력값이 있는지 확인
  expect(input).toHaveValue("입력값");
  // 4. 버튼이 보이는지 확인
  expect(deleteButton).toBeInTheDocument();
});

test("X 버튼 클릭 시 입력값이 없어져야 한다.", () => {
  render(<Input defaultValue="입력값" />);

  // 1. input 요소를 가져온다
  const input = screen.getByRole("textbox");
  // 2. 버튼을 가져온다 -> 없어도 에러가 안나는 코드
  const deleteButton = screen.getByRole("button", { name: "입력값 지우기" });

  // 3. input에 입력값이 있는지 확인
  expect(input).toHaveValue("입력값");
  // 4. 버튼을 클릭하면
  fireEvent.click(deleteButton);

  // 5. input 값이 없어져야 한다.
  expect(input).toHaveValue("");
});

test("Input 컴포넌트에 (유효성) 에러 시 에러 메세지가 발생하는지 확인한다", () => {
  render(<Input isError={true} errorMessage="입력값에 문제가 있습니다" />);

  const errorMessage = screen.getByText("입력값에 문제가 있습니다");
  expect(errorMessage).toBeInTheDocument();
});
