import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Link href="/text-input-with-chips">Text Input With Chips</Link>
      <Link href="/menu">Menu</Link>
      <Link href="/modal">Modal</Link>
      <Link href="/content-scroll-modal">Content Scroll Modal</Link>
      <Link href="/bottom-sheet">Bottom Sheet</Link>
      <Link href="/inset-viewport-full-height">Inset Viewport Full Height</Link>
      <Link href="/inset-viewport-full-height-flex">
        Inset Viewport Full Height Flex
      </Link>
      <Link href="/blur-gradient">Blur Gradient</Link>
      <Link href="/rich-editor">Rich Editor</Link>
      <Link href="/hero-section-scroll-snap">Hero Section Scroll Snap</Link>
      <Link href="/infinite-scroll">Infinite Scroll</Link>
    </main>
  );
}
