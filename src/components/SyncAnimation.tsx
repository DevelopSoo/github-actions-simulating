import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function SyncAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const [items, setItems] = useState([1, 2, 3, 4, 5]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8">
      <button
        onClick={toggleVisibility}
        className="mb-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        {isVisible ? "숨기기" : "보이기"}
      </button>

      <div className="grid grid-cols-5 gap-4">
        <AnimatePresence>
          {isVisible &&
            items.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.5 }}
                className="cursor-pointer rounded-lg bg-purple-500 p-4 text-center text-white"
                onClick={() => removeItem(index)}
              >
                {item}
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
