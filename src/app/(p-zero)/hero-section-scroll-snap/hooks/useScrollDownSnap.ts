import { useEffect, useRef, useState } from 'react';

/**
 * 스크롤 방향을 감지하는 커스텀 훅
 * @returns {boolean} 스크롤 방향 (아래로: true, 위로: false)
 */
const useScrollDirection = (): boolean => {
  // 이전 스크롤 위치 저장
  const [lastScrollY, setLastScrollY] = useState(0);
  // 스크롤 방향 (아래로: true, 위로: false)
  const [scrollingDown, setScrollingDown] = useState(true);

  useEffect(() => {
    // 스크롤 방향 감지 함수
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 이전 스크롤 위치와 현재 스크롤 위치 비교
      if (currentScrollY > lastScrollY) {
        // 아래로 스크롤하는 중
        setScrollingDown(true);
      } else {
        // 위로 스크롤하는 중
        setScrollingDown(false);
      }

      // 현재 스크롤 위치 업데이트
      setLastScrollY(currentScrollY);
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 정리 작업
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]); // lastScrollY가 변경될 때마다 실행

  return scrollingDown;
};

/**
 * 아래로 스크롤할 때만 스크롤에서 손을 뗐을 때 스크롤 스냅 기능을 구현하는 커스텀 훅
 * @param ref 관찰할 요소의 ref
 * @param threshold 관찰 요소가 얼마나 보여야 콜백이 실행될지 설정 (0~1)
 * @param scrollEndDelay 스크롤이 멈춘 것으로 간주할 지연 시간(ms), 기본값 150ms
 */
const useScrollDownSnap = (
  ref: React.RefObject<HTMLElement>,
  threshold: number = 0.1,
  scrollEndDelay: number = 10
) => {
  // 스크롤 타이머 참조 저장
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);
  // IntersectionObserver 참조 저장
  const observerRef = useRef<IntersectionObserver | null>(null);
  // 현재 요소가 화면에 보이는지 여부 저장
  const isIntersectingRef = useRef<boolean>(false);
  // 현재 스크롤 스냅이 진행 중인지 여부
  const isSnapInProgressRef = useRef<boolean>(false);

  // 커스텀 훅을 사용하여 스크롤 방향 가져오기
  const isScrollingDown = useScrollDirection();

  useEffect(() => {
    // 관찰할 요소가 없으면 실행하지 않음
    if (!ref.current) return;

    // 스크롤이 멈췄을 때 실행할 함수
    const handleScrollEnd = () => {
      // 이미 스크롤 스냅이 진행 중이면 무시
      if (isSnapInProgressRef.current) return;

      // ref 요소가 없으면 실행하지 않음
      if (!ref.current) return;

      // 현재 스크롤 위치가 ref 영역 내에 있는지 확인
      const isWithinRefArea = isScrollPositionWithinRefArea(ref.current);

      // ref 영역 내에서 스크롤하고 있다면 스크롤 스냅 실행하지 않음
      if (isWithinRefArea) return;

      // 요소가 화면에 보이는 상태이고 아래로 스크롤하는 중일 때만 스크롤 스냅 실행
      if (isIntersectingRef.current && isScrollingDown) {
        // 스크롤 스냅 진행 중 플래그 설정
        isSnapInProgressRef.current = true;

        // 부드러운 스크롤로 해당 섹션의 상단으로 이동
        ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // 애니메이션이 완료되었을 것으로 가정하고 플래그 재설정 (일반적인 애니메이션 시간은 약 500ms)
        setTimeout(() => {
          isSnapInProgressRef.current = false;
        }, 500);
      }
    };

    // 현재 스크롤 위치가 ref 영역 내에 있는지 확인하는 함수
    const isScrollPositionWithinRefArea = (element: HTMLElement): boolean => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementBottom = rect.bottom;

      // 현재 스크롤 위치가 요소의 상단과 하단 사이에 있는지 확인
      // 요소가 화면에 일부라도 보이고, 요소의 상단이 화면 상단에 가까울수록 스크롤 스냅을 실행하지 않음
      return elementTop <= 0 && elementBottom > 0;
    };

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      // 이전 타이머가 있으면 취소
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }

      // 새로운 타이머 설정 - 지정된 시간 동안 스크롤이 없으면 스크롤이 멈춘 것으로 간주
      scrollTimer.current = setTimeout(handleScrollEnd, scrollEndDelay);
    };

    // Intersection Observer 생성
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 요소의 가시성 상태 업데이트
          isIntersectingRef.current = entry.isIntersecting;
        });
      },
      {
        // 옵저버 옵션: 타겟 요소가 얼마나 보여야 콜백이 실행될지 설정
        threshold,
      }
    );

    // 타겟 섹션 관찰 시작
    observerRef.current.observe(ref.current);

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 정리 작업
    return () => {
      // 스크롤 이벤트 리스너 제거
      window.removeEventListener('scroll', handleScroll);

      // 타이머 정리
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }

      // Observer 정리
      if (observerRef.current && ref.current) {
        observerRef.current.unobserve(ref.current);
        observerRef.current.disconnect();
      }
    };
  }, [ref, threshold, scrollEndDelay, isScrollingDown]);
};

export default useScrollDownSnap;
