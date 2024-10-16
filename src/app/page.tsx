import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Link href="/text-input-with-chips">Text Input With Chips</Link>
      <Link href="/menu">Menu</Link>
      <Link href="/modal">Modal</Link>
      <Link href="/bottom-sheet">Bottom Sheet</Link>
      <Link href="/inset-viewport-full-height">Inset Viewport Full Height</Link>
      <Link href="/inset-viewport-full-height-flex">
        Inset Viewport Full Height Flex
      </Link>
    </main>
  );
}
