// src/app/main/page.tsx

"use client";

import { useState } from "react";
import NewUserPromotionModal from "@/components/Modal/NewUserPromotionModal";
import { Button } from "@/stories/Button";
import { Button as ShadcnButton } from "@/components/ui/button";

export default function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold">코드팡</h1>
      {isModalOpen && <NewUserPromotionModal onClose={handleCloseModal} />}
      <ShadcnButton variant="default">스토리북 버튼</ShadcnButton>
      <Button
        label="스토리북 버튼2"
        primary
        size="large"
        onClick={() => {
          alert("스토리북 버튼 클릭");
        }}
      />
    </>
  );
}
