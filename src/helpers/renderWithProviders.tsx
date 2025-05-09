import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
};

// 모든 Provider를 포함한 래퍼 함수
function renderWithProviders(ui: React.ReactNode, options = {}) {
  return render(ui, { wrapper: AllProviders, ...options });
}

// 내보내기
export { renderWithProviders };
