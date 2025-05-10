export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log(email, password);

  return Response.json(
    { message: "이메일 또는 비밀번호가 올바르지 않습니다." },
    {
      status: 500,
    },
  );
}
