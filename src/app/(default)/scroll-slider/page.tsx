'use client';

import { useEffect, useRef } from 'react';

const Page = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 초기 스크롤 위치를 1000으로 설정
    container.scrollLeft = 1000;

    let animationId: number;
    const speed = 1; // 스크롤 속도 (픽셀/프레임)
    const patternWidth = 1000; // 반복 패턴의 너비 (1-10 아이템 = 10 * 100px)
    const lowerBoundary = 1000; // 하한선
    const upperBoundary = 2000; // 상한선

    const animate = () => {
      const currentScroll = container.scrollLeft;

      // 1000 아래로 내려가면 동일한 시각적 위치인 2000으로 점프
      if (currentScroll < lowerBoundary) {
        container.scrollLeft = currentScroll + patternWidth;
      }
      // 2000 위로 올라가면 동일한 시각적 위치인 1000으로 점프
      else if (currentScroll > upperBoundary) {
        container.scrollLeft = currentScroll - patternWidth;
      } else {
        container.scrollLeft = currentScroll + speed;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div>
      <div
        ref={containerRef}
        className="overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        {/* 슬라이드 래퍼 */}
        <div className="flex">
          <div className="w-[100px] h-64 bg-red-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            1
          </div>
          <div className="w-[100px] h-64 bg-orange-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            2
          </div>
          <div className="w-[100px] h-64 bg-yellow-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            3
          </div>
          <div className="w-[100px] h-64 bg-green-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            4
          </div>
          <div className="w-[100px] h-64 bg-blue-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            5
          </div>
          <div className="w-[100px] h-64 bg-slate-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            6
          </div>
          <div className="w-[100px] h-64 bg-purple-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            7
          </div>
          <div className="w-[100px] h-64 bg-pink-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            8
          </div>
          <div className="w-[100px] h-64 bg-cyan-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            9
          </div>
          <div className="w-[100px] h-64 bg-indigo-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            10
          </div>
          <div className="w-[100px] h-64 bg-red-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            1
          </div>
          <div className="w-[100px] h-64 bg-orange-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            2
          </div>
          <div className="w-[100px] h-64 bg-yellow-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            3
          </div>
          <div className="w-[100px] h-64 bg-green-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            4
          </div>
          <div className="w-[100px] h-64 bg-blue-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            5
          </div>
          <div className="w-[100px] h-64 bg-slate-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            6
          </div>
          <div className="w-[100px] h-64 bg-purple-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            7
          </div>
          <div className="w-[100px] h-64 bg-pink-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            8
          </div>
          <div className="w-[100px] h-64 bg-cyan-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            9
          </div>
          <div className="w-[100px] h-64 bg-indigo-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            10
          </div>
          <div className="w-[100px] h-64 bg-red-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            1
          </div>
          <div className="w-[100px] h-64 bg-orange-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            2
          </div>
          <div className="w-[100px] h-64 bg-yellow-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            3
          </div>
          <div className="w-[100px] h-64 bg-green-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            4
          </div>
          <div className="w-[100px] h-64 bg-blue-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            5
          </div>
          <div className="w-[100px] h-64 bg-slate-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            6
          </div>
          <div className="w-[100px] h-64 bg-purple-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            7
          </div>
          <div className="w-[100px] h-64 bg-pink-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            8
          </div>
          <div className="w-[100px] h-64 bg-cyan-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            9
          </div>
          <div className="w-[100px] h-64 bg-indigo-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            10
          </div>
          <div className="w-[100px] h-64 bg-red-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            1
          </div>
          <div className="w-[100px] h-64 bg-orange-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            2
          </div>
          <div className="w-[100px] h-64 bg-yellow-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            3
          </div>
          <div className="w-[100px] h-64 bg-green-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            4
          </div>
          <div className="w-[100px] h-64 bg-blue-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            5
          </div>
          <div className="w-[100px] h-64 bg-slate-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            6
          </div>
          <div className="w-[100px] h-64 bg-purple-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            7
          </div>
          <div className="w-[100px] h-64 bg-pink-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            8
          </div>
          <div className="w-[100px] h-64 bg-cyan-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            9
          </div>
          <div className="w-[100px] h-64 bg-indigo-500 shrink-0 flex items-center justify-center text-white text-xl font-bold">
            10
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
