// discountCalculator.test.ts
import {
  calculatePrice,
  type Membership,
  type Coupon,
} from "./discountCalculator";

// 4. 중복된 가격 상수 정의를 개선하기 위해 상수 추가
const BASE_PRICE_100K = 100000;
const BASE_PRICE_50K = 50000;
const BASE_PRICE_200K = 200000;
const BASE_PRICE_30K = 30000;

// 1. 중복된 고객 객체 생성을 개선하기 위해 헬퍼 함수 createCustomer를 추가
// 2. 타입 캐스팅(as)을 개선하기 위해 TypeScript 타입을 명확히 정의
const createCustomer = (
  membership: Membership = "regular",
  coupon?: Coupon,
): { membership: Membership; coupon?: Coupon } => ({
  membership,
  coupon,
});

describe("할인 계산기", () => {
  // 5. 테스트 구조를 개선하기 위해 describe 블록으로 기능별 그룹화
  describe("금액별 할인", () => {
    test("5만원 미만 구매 시 할인이 적용되지 않음", () => {
      const customer = createCustomer();
      const finalPrice = calculatePrice(BASE_PRICE_30K, customer);
      expect(finalPrice).toBe(BASE_PRICE_30K);
    });

    test("5만원 이상 구매 시 5% 할인 적용", () => {
      const customer = createCustomer();
      const finalPrice = calculatePrice(BASE_PRICE_50K, customer);
      expect(finalPrice).toBe(BASE_PRICE_50K * 0.95); // 47,500
    });

    test("10만원 이상 구매 시 10% 할인 적용", () => {
      const customer = createCustomer();
      const finalPrice = calculatePrice(BASE_PRICE_100K, customer);
      expect(finalPrice).toBe(BASE_PRICE_100K * 0.9); // 90,000
    });

    test("20만원 이상 구매 시 20% 할인 적용", () => {
      const customer = createCustomer();
      const finalPrice = calculatePrice(BASE_PRICE_200K, customer);
      expect(finalPrice).toBe(BASE_PRICE_200K * 0.8); // 160,000
    });
  });

  describe("회원 등급별 추가 할인", () => {
    test("실버 회원은 10만원 구매 시 추가 2% 할인 적용", () => {
      const customer = createCustomer("silver");
      const finalPrice = calculatePrice(BASE_PRICE_100K, customer);
      expect(finalPrice).toBe(BASE_PRICE_100K * 0.9 * 0.98); // 88,200
    });

    test("골드 회원은 10만원 구매 시 추가 5% 할인 적용", () => {
      const customer = createCustomer("gold");
      const finalPrice = calculatePrice(BASE_PRICE_100K, customer);
      expect(finalPrice).toBe(BASE_PRICE_100K * 0.9 * 0.95); // 85,500
    });

    test("VIP 회원은 10만원 구매 시 추가 10% 할인 적용", () => {
      const customer = createCustomer("vip");
      const finalPrice = calculatePrice(BASE_PRICE_100K, customer);
      expect(finalPrice).toBe(BASE_PRICE_100K * 0.9 * 0.9); // 81,000
    });
  });

  describe("쿠폰 할인", () => {
    // 3. 테스트 케이스 명을 개선하기 위해 더 구체적인 이름으로 수정
    test("5,000원 정액 쿠폰 적용 시 올바른 할인", () => {
      const customer = createCustomer("regular", {
        type: "fixed",
        value: 5000,
      });
      const finalPrice = calculatePrice(BASE_PRICE_100K, customer);
      expect(finalPrice).toBe(BASE_PRICE_100K * 0.9 - 5000); // 85,000
    });

    test("5% 정률 쿠폰 적용 시 올바른 할인", () => {
      const customer = createCustomer("regular", {
        type: "percentage",
        value: 5,
      });
      const finalPrice = calculatePrice(BASE_PRICE_100K, customer);
      expect(finalPrice).toBe(BASE_PRICE_100K * 0.9 * 0.95); // 85,500
    });
  });

  describe("최소 가격 제한", () => {
    test("할인 후 가격이 원래 가격의 50% 이하로 내려가지 않음", () => {
      const customer = createCustomer("vip", {
        type: "percentage",
        value: 50,
      });
      const finalPrice = calculatePrice(BASE_PRICE_100K, customer);
      expect(finalPrice).toBe(BASE_PRICE_100K * 0.5); // 50,000
    });
  });
});
