'use client';

import { useRef } from 'react';
import useScrollDownSnap from './useScrollDownSnap';
const Page = () => {
  // 스크롤 스냅을 적용할 섹션에 대한 ref 생성
  const snapSectionRef = useRef<HTMLElement>(null);

  useScrollDownSnap(snapSectionRef);

  return (
    <>
      {/* full height section */}
      <section className="h-screen bg-blue-200 border-blue-500 border-[20px]">
        <img
          src="https://picsum.photos/500"
          className="size-full object-cover"
        />
      </section>
      {/* snap section - ref 추가 */}
      <section
        ref={snapSectionRef}
        className="h-[300px] bg-yellow-200 border-yellow-500 border-[20px]"
      >
        <img
          src="https://picsum.photos/500"
          className="size-full object-cover"
        />
      </section>
      <section className="h-screen bg-green-200 border-green-500 border-[20px] flex items-center justify-center text-4xl"></section>
    </>
  );
};

export default Page;
