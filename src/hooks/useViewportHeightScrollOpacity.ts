import { useEffect, useState } from 'react';

/**
 * viewport height를 기준으로 스크롤 위치에 따른 opacity 값을 계산하는 커스텀 훅
 * @returns {number} 계산된 opacity 값 (0~1)
 * @description
 * viewport height만큼 스크롤했다면 opacity: 0
 * 하나도 스크롤하지 않았다면 opacity: 1
 */
const useViewportHeightScrollOpacity = (): number => {
  // opacity 상태 저장 (기본값: 1 - 완전 불투명)
  const [opacity, setOpacity] = useState<number>(1);

  useEffect(() => {
    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      // 현재 스크롤 위치
      const scrollY = window.scrollY;
      // 뷰포트 높이
      const viewportHeight = window.innerHeight;
      
      // opacity 계산: 스크롤 위치 / 뷰포트 높이를 기준으로 1에서 감소
      // 스크롤 0일 때 opacity 1, 뷰포트 높이만큼 스크롤했을 때 opacity 0
      const calculatedOpacity = Math.max(0, 1 - scrollY / viewportHeight);
      
      // 상태 업데이트
      setOpacity(calculatedOpacity);
    };

    // 초기 opacity 설정
    handleScroll();

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 정리 작업
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // 의존성 배열이 비어있으므로 컴포넌트 마운트 시 한 번만 실행

  return opacity;
};

export default useViewportHeightScrollOpacity;
