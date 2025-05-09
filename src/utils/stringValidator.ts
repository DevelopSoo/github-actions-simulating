export function validateUsername(username: string) {
  if (typeof username !== "string") return false;
  // 영문자, 숫자, '_'만 허용, 3-20자 제한
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}
