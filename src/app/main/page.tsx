// src/app/main/page.tsx

"use client";

import { useState } from "react";
import NewUserPromotionModal from "@/components/Modal/NewUserPromotionModal";
import * as Sentry from "@sentry/nextjs";

class CustomSentryError extends Error {
  constructor(name: string, message: string) {
    // 부모 Error message 상속받기
    super(message);
    // name을 내 마음대로 바꾸기
    this.name = name;
  }
}

export default function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold">코드팡</h1>
      {isModalOpen && <NewUserPromotionModal onClose={handleCloseModal} />}
      <button
        onClick={() => {
          alert("에러 호출하기");
          Sentry.withScope((scope) => {
            scope.setLevel("fatal"); // 'fatal', 'error', 'warning', 'info', 'debug' 중 선택

            scope.setContext("버튼 클릭", {
              url: window.location.href,
              content: "스토리북 버튼 눌렀다",
            });

            scope.setContext("에러", {
              메세지: "메시지다!",
              스택: "스택이다!",
            });

            scope.setTags({
              mytag: "검색용태그",
            });
            Sentry.captureException(
              new CustomSentryError(
                `[Error Code] - 메인 페이지, 에러 호출 에러 - context 추가`,
                "누르면 안되는 걸 누르셨습니다",
              ),
            );
          });
        }}
      >
        에러 호출하기
      </button>
    </>
  );
}
