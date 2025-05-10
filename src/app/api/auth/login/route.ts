export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return Response.json(
      { message: "이메일 또는 비밀번호를 입력해주세요." },
      {
        status: 400,
      },
    );
  }

  return Response.json(
    { message: "큰일났습니다." },
    {
      status: 500,
    },
  );
}
