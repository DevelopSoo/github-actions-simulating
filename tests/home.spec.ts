// tests/home.spec.tsx

import { test, expect } from "@playwright/test";

test("홈페이지가 올바르게 로드됩니다.", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const title = page.locator("h1");
  await expect(title).toBeVisible();
  await expect(title).toHaveText("게시글 목록");
});
