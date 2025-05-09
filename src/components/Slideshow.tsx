import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 이미지 타입 정의
interface ImageType {
  src: string;
  alt: string;
}

// 슬라이드쇼 컴포넌트 props 타입 정의
interface SlideshowProps {
  images: ImageType[];
}

export default function Slideshow({ images }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // 다음 이미지로 이동
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // 이전 이미지로 이동
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  // 슬라이드 애니메이션 변형 설정
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="relative mx-auto w-full max-w-3xl overflow-hidden">
      <div className="relative h-80">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute flex h-full w-full items-center justify-center"
          >
            <div
              className="h-full w-full rounded-lg bg-cover bg-center shadow-lg"
              style={{ backgroundImage: `url(${images[currentIndex].src})` }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 이전 버튼 */}
      <button
        onClick={prevSlide}
        className="bg-opacity-50 hover:bg-opacity-70 absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-black p-2 text-white transition-all"
        aria-label="이전 이미지"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* 다음 버튼 */}
      <button
        onClick={nextSlide}
        className="bg-opacity-50 hover:bg-opacity-70 absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full bg-black p-2 text-white transition-all"
        aria-label="다음 이미지"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* 인디케이터 */}
      <div className="absolute right-0 bottom-4 left-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-opacity-50 bg-white"
            }`}
            aria-label={`${index + 1}번 이미지로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
