import { Input } from '@/components/Input';

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-80">
        <Input isError={true} errorMessage="입력값에 문제가 있습니다" />
        <div>hi</div>
      </div>
    </div>
  );
}
