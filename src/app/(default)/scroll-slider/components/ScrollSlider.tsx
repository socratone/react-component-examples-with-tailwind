import { useEffect, useRef } from 'react';

interface ScrollSliderProps {
  itemWidth: number;
  itemCount: number;
  children: React.ReactNode;
}

const ScrollSlider = ({
  itemWidth,
  itemCount,
  children,
}: ScrollSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 초기 스크롤 위치를 아이템 너비 * 아이템 개수로 설정
    container.scrollLeft = itemWidth * itemCount;

    let animationId: number;
    const speed = 1; // 스크롤 속도 (픽셀/프레임)
    const patternWidth = itemWidth * itemCount; // 반복 패턴의 너비 (1-10 아이템 = 10 * 100px)
    const lowerBoundary = itemWidth * itemCount; // 하한선
    const upperBoundary = itemWidth * itemCount * 2; // 상한선

    const animate = () => {
      const currentScroll = container.scrollLeft;

      // 하한선 아래로 내려가면 동일한 시각적 위치인 상한선으로 점프
      if (currentScroll < lowerBoundary) {
        container.scrollLeft = currentScroll + patternWidth;
      }
      // 상한선 위로 올라가면 동일한 시각적 위치인 하한선으로 점프
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
    <div
      ref={containerRef}
      className="overflow-x-auto"
      style={{ scrollbarWidth: 'none' }}
    >
      <div className="flex">
        {children}
        {children}
        {children}
      </div>
    </div>
  );
};

export default ScrollSlider;
