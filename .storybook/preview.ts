import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // 전체 스토리에 배경 설정
    // backgrounds: {
    //   values: [
    //     {
    //       name: "red",
    //       value: "red",
    //     },
    //     {
    //       name: "blue",
    //       value: "blue",
    //     },
    //   ],
    //   default: "blue",
    // },
  },
};

export default preview;
