import axios from "axios";

// fetch로 유저의 목록을 요청하는 함수
export async function fetchUsers() {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await response.json();
    return data;
  } catch {
    throw new Error("알 수 없는 에러가 발생했습니다.");
  }
}

// axios로 유저의 상세 정보를 요청하는 함수
export async function getUser(id: number) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );
    return response.data;
  } catch {
    throw new Error("유저 정보를 불러오는데 실패했습니다.");
  }
}
