import { render, screen } from "@testing-library/react";
import Home from "./page";

test("test", () => {
  render(<Home />);
  expect(screen.getByText("게시글 목록")).toBeInTheDocument();
});
