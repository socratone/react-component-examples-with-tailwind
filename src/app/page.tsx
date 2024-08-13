import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Link href="/text-input-with-chips">Text Input With Chips</Link>
      <Link href="/menu">Menu</Link>
    </main>
  );
}
