// tests/products.spec.ts
import { test, expect } from "@playwright/test";
import path from "path";

test.describe("상품 페이지 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/products");
  });

  test("두 번째 장바구니 버튼을 가져온다", async ({ page }) => {
    const secondAddToCartButton = page
      .getByRole("listitem")
      .filter({ hasText: "상품2" })
      .getByRole("button", { name: "장바구니 담기" });

    await expect(secondAddToCartButton).toBeVisible();
  });

  test("상품2가 아닌 상품의 개수 확인", async ({ page }) => {
    await expect(
      page.getByRole("listitem").filter({ hasNotText: "상품2" }),
    ).toHaveCount(2);
  });

  test("구글 링크가 올바르게 작동하는지 확인", async ({ page }) => {
    const popupPromise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "구글" }).click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL("https://www.google.com");
    // aria-label="검색"인 요소를 찾는다
    const searchInput = popup.getByLabel("검색", { exact: true });
    await expect(searchInput).toBeVisible();
  });

  test("파일 업로드 기능 테스트", async ({ page }) => {
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByLabel("파일 업로드").click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, "../public/file.svg"));
  });
});
