// app/page.tsx
import HTMLPreviewer from '@/app/components/HTMLPreviewer';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <HTMLPreviewer />
    </div>
  );
}