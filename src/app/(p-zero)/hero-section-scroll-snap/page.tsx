'use client';

import { cn } from '@/utils/cn';
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

  const isVisible = opacity < 0.05;

  return (
    <div>
      <div
        className="fixed inset-0 -z-10"
        style={{ opacity, display: isVisible ? 'none' : 'block' }}
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
      <section
        className="relative h-screen -z-20"
        style={{ background: BG_COLOR }}
      />
      {/* snap section */}
      <section
        ref={snapSectionRef}
        className={cn('h-[300px] relative -z-30', {
          'z-0': isVisible,
        })}
      >
        {/* 위쪽은 흰색, 아래쪽은 투명한 그라디언트 추가 */}
        <div
          className="absolute inset-x-0 top-0 z-10"
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
      <section
        className={cn(
          'bg-green-100 p-5 flex flex-col items-center justify-center text-2xl -z-30 relative',
          {
            'z-0': isVisible,
          }
        )}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
          nesciunt, quae at facilis perferendis quo illum quam inventore nobis
          accusantium incidunt aspernatur esse! Laboriosam voluptate eligendi
          doloribus molestias dolorem. Nemo.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
          nesciunt, quae at facilis perferendis quo illum quam inventore nobis
          accusantium incidunt aspernatur esse! Laboriosam voluptate eligendi
          doloribus molestias dolorem. Nemo.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
          nesciunt, quae at facilis perferendis quo illum quam inventore nobis
          accusantium incidunt aspernatur esse! Laboriosam voluptate eligendi
          doloribus molestias dolorem. Nemo.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
          nesciunt, quae at facilis perferendis quo illum quam inventore nobis
          accusantium incidunt aspernatur esse! Laboriosam voluptate eligendi
          doloribus molestias dolorem. Nemo.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
          nesciunt, quae at facilis perferendis quo illum quam inventore nobis
          accusantium incidunt aspernatur esse! Laboriosam voluptate eligendi
          doloribus molestias dolorem. Nemo.
        </p>
      </section>
    </div>
  );
};

export default Page;
