import { filterByCategory, sortByValue, type Item } from "./dataUtils";

describe("dataUtils", () => {
  let data: Item[] = [];

  beforeEach(() => {
    data = [
      { id: 1, category: "A", value: 10 },
      { id: 2, category: "B", value: 30 },
      { id: 3, category: "A", value: 20 },
    ];
  });

  test("filterByCategory가 카테고리 필터링을 제대로 하는지 검증", () => {
    const filteredData = filterByCategory(data, "A");

    expect(filteredData).toEqual([
      { id: 1, category: "A", value: 10 },
      { id: 3, category: "A", value: 20 },
    ]);
  });

  test("데이터 변경 후 sortByValue가 정렬을 제대로 하는지 검증", () => {
    // 직접 변경하는 게 좋은 건 아님
    data[0].value = 50;

    const sortedData = sortByValue(data);

    expect(sortedData).toEqual([
      { id: 3, category: "A", value: 20 },
      { id: 2, category: "B", value: 30 },
      { id: 1, category: "A", value: 50 },
    ]);
  });

  // 여기서 에러 발생
  test("sortByValue가 정렬을 제대로 하는지 검증", () => {
    const sortedData = sortByValue(data);

    expect(sortedData).toEqual([
      { id: 1, category: "A", value: 10 },
      { id: 3, category: "A", value: 20 },
      { id: 2, category: "B", value: 30 },
    ]);
  });
});
