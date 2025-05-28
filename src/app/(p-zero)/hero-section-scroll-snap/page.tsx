'use client';

import useScrollDownSnap from '@/hooks/useScrollDownSnap';
import useViewportHeightScrollOpacity from '@/hooks/useViewportHeightScrollOpacity';
import { useRef } from 'react';

const GRADIENT_RATION = 3000;

const Page = () => {
  // 스크롤 스냅을 적용할 섹션에 대한 ref 생성
  const snapSectionRef = useRef<HTMLElement>(null);

  // viewport height를 기준으로 스크롤 위치에 따른 opacity 값 계산
  const opacity = useViewportHeightScrollOpacity();

  useScrollDownSnap(snapSectionRef);

  return (
    <div className="bg-black">
      <div
        className="fixed inset-0 z-20"
        style={{ opacity, pointerEvents: opacity === 0 ? 'none' : 'auto' }}
      >
        <video
          src="https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
          autoPlay
          loop
          muted
          className="size-full object-cover"
        />
      </div>
      {/* bumper height section */}
      <section className="relative h-screen" />
      {/* snap section */}
      <section ref={snapSectionRef} className="h-[300px] relative">
        {/* 위쪽은 흰색, 아래쪽은 투명한 그라디언트 추가 */}
        <div
          className="absolute inset-x-0 top-0 z-10 pointer-events-none"
          style={{
            height: opacity * GRADIENT_RATION,
            background: 'linear-gradient(to bottom, black, transparent)',
          }}
        />
        <video
          src="https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
          autoPlay
          loop
          muted
          className="size-full object-cover"
        />
        <button className="bg-gray-300 p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          클릭
        </button>
      </section>
      <section className="h-screen bg-green-200 border-green-500 border-[20px] flex items-center justify-center text-4xl"></section>
    </div>
  );
};

export default Page;
