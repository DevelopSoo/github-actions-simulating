// src/services/UserService.ts
export async function getUser(id: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );

  const data = await response.json();
  return data;
}
