'use client';

import useScrollDownSnap from './hooks/useScrollDownSnap';
import useViewportHeightScrollOpacity from './hooks/useViewportHeightScrollOpacity';
import { applyEaseOut } from './utils';
import { useRef } from 'react';

const GRADIENT_RATION = 5000;
const BG_COLOR = '#4b5563';

const Page = () => {
  // 스크롤 스냅을 적용할 섹션에 대한 ref 생성
  const snapSectionRef = useRef<HTMLElement>(null);

  // viewport height를 기준으로 스크롤 위치에 따른 opacity 값 계산
  const linearOpacity = useViewportHeightScrollOpacity();

  const opacity = applyEaseOut(linearOpacity);

  useScrollDownSnap(snapSectionRef);

  return (
    <div className="bg-gray-600" style={{ background: BG_COLOR }}>
      <div
        className="fixed inset-0 z-20"
        style={{ opacity, pointerEvents: opacity < 0.05 ? 'none' : 'auto' }}
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
            height: linearOpacity * GRADIENT_RATION, // 여기서는 선형 값을 사용 (그라디언트 높이 계산용)
            background: `linear-gradient(to bottom, ${BG_COLOR}, transparent)`,
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
