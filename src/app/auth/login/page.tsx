// src/app/auth/login/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Sentry from "@sentry/nextjs";

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function LoginPage() {
  const router = useRouter();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail(values.email)) {
      alert("정확한 이메일 형식을 지켜주세요.");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 400) {
          alert("이메일 또는 비밀번호가 올바르지 않습니다.");
        } else {
          throw new Error(
            `로그인 요청 에러!: ${response.status} ${response.statusText}`,
          );
        }
      }

      await response.json();
      router.push("/products");
    } catch (error) {
      Sentry.captureException(error);
    }
  };
  return (
    <>
      <h1>로그인 페이지</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="text"
          placeholder="이메일"
          value={values.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={values.password}
          onChange={handleChange}
        />

        <button type="submit">로그인</button>
      </form>
      <Link href="/auth/signup">회원가입 페이지로 이동</Link>
    </>
  );
}
