import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './bottom-sheet-animation.css';

interface DraggableBottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  initialTop: number;
}

const OFFSET_MARGIN = 48;

const DraggableBottomSheet = ({
  open,
  onClose,
  children,
  initialTop,
}: DraggableBottomSheetProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [containerAnimation, setContainerAnimation] = useState<string>();
  const [backdropAnimation, setBackdropAnimation] = useState<string>();

  const sheetRef = useRef<HTMLDivElement>(null);

  const topRef = useRef(0);
  const dragStartY = useRef<number | null>(null); // 드래그 시작 위치
  const dragOffsetY = useRef<number | null>(null); // top과 클릭 위치 offset

  // requestAnimationFrame ID 저장을 위한 ref
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (open) {
      setIsVisible(true);
      setBackdropAnimation('fadeIn 0.3s ease-out');
      setContainerAnimation('slideUp 0.3s ease-out');
    } else {
      setBackdropAnimation('fadeOut 0.3s ease-in');
      setContainerAnimation('slideDown 0.3s ease-in');
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }

    // Clean up the timeout when the component unmounts or `open` changes
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [open]);

  // 전역적으로 touchmove 이벤트에서 새로고침 방지
  useEffect(() => {
    const preventDefault = (event: TouchEvent) => {
      event.preventDefault();
    };

    if (open) {
      window.addEventListener('touchmove', preventDefault, { passive: false });
    }

    return () => {
      window.removeEventListener('touchmove', preventDefault);
    };
  }, [open]);

  /**
   * 마우스 이동에 따라 top 업데이트 (desktop)
   */
  const throttledMouseMove = useCallback((event: MouseEvent) => {
    if (!animationFrameIdRef.current) {
      const updatePosition = () => {
        if (!sheetRef.current) return;
        if (typeof dragOffsetY.current !== 'number') return;

        const newTop = event.clientY - dragOffsetY.current;

        // viewport 위로 넘어가지 않도록
        if (newTop < 0) {
          topRef.current = 0;
          sheetRef.current.style.top = `${topRef.current}px`;
          return;
        }

        // viewport 아래로 내려가지 않도록
        if (newTop > window.innerHeight - OFFSET_MARGIN) {
          topRef.current = window.innerHeight - OFFSET_MARGIN;
          sheetRef.current.style.top = `${topRef.current}px`;
          return;
        }

        topRef.current = newTop;
        sheetRef.current.style.top = `${topRef.current}px`;

        // requestAnimationFrame 요청이 종료되면 다음 요청을 위해 초기화
        animationFrameIdRef.current = null;
      };

      // requestAnimationFrame으로 DOM 업데이트
      animationFrameIdRef.current = requestAnimationFrame(updatePosition);
    }
  }, []);

  /**
   * 드래그 종료 (desktop)
   */
  const handleMouseUp = useCallback(() => {
    dragStartY.current = null;
    dragOffsetY.current = null;

    window.removeEventListener('mousemove', throttledMouseMove); // mousemove 이벤트 해제
    window.removeEventListener('mouseup', handleMouseUp); // mouseup 이벤트 해제

    // 애니메이션 프레임 취소
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
  }, []);

  /**
   * 드래그 시작 (desktop)
   */
  const handleMouseDown = (event: React.MouseEvent) => {
    topRef.current = parseInt(sheetRef.current?.style.top ?? '');

    // 드래그 시작 지점 기록
    dragStartY.current = event.clientY;
    dragOffsetY.current = event.clientY - topRef.current;

    window.addEventListener('mousemove', throttledMouseMove); // window에서 mousemove 감지
    window.addEventListener('mouseup', handleMouseUp); // window에서 mouseup 감지
  };

  /**
   * 터치 이동에 따라 top 업데이트 (mobile)
   */
  const throttledTouchMove = useCallback((event: TouchEvent) => {
    if (!animationFrameIdRef.current) {
      const updatePosition = () => {
        if (!sheetRef.current) return;
        if (typeof dragOffsetY.current !== 'number') return;

        const touchY = event.touches[0].clientY;
        const newTop = touchY - dragOffsetY.current;

        // viewport 위로 넘어가지 않도록
        if (newTop < 0) {
          topRef.current = 0;
          sheetRef.current.style.top = `${topRef.current}px`;
          return;
        }

        // viewport 아래로 내려가지 않도록
        if (newTop > window.innerHeight - OFFSET_MARGIN) {
          topRef.current = window.innerHeight - OFFSET_MARGIN;
          sheetRef.current.style.top = `${topRef.current}px`;
          return;
        }

        topRef.current = newTop;
        sheetRef.current.style.top = `${topRef.current}px`;

        // requestAnimationFrame 요청이 종료되면 다음 요청을 위해 초기화
        animationFrameIdRef.current = null;
      };

      // requestAnimationFrame으로 DOM 업데이트
      animationFrameIdRef.current = requestAnimationFrame(updatePosition);
    }
  }, []);

  /**
   * 터치 종료 (mobile)
   */
  const handleTouchEnd = useCallback(() => {
    dragStartY.current = null;
    dragOffsetY.current = null;

    window.removeEventListener('touchmove', throttledTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);

    // 애니메이션 프레임 취소
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
  }, []);

  /**
   * 터치 시작 (mobile)
   */
  const handleTouchStart = (event: React.TouchEvent) => {
    topRef.current = parseInt(sheetRef.current?.style.top ?? '');

    const touchY = event.touches[0].clientY;

    // 드래그 시작 지점 기록
    dragStartY.current = touchY;
    dragOffsetY.current = touchY - topRef.current;

    window.addEventListener('touchmove', throttledTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  if (!isVisible) return null;

  return createPortal(
    <>
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        style={{ animation: backdropAnimation }}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className="fixed bottom-0 inset-x-0 bg-white rounded-t-3xl shadow-lg"
        style={{
          top: initialTop,
          animation: containerAnimation,
          transition: 'top 0.08s linear',
        }}
      >
        {/* Draggable Button */}
        <button
          className="w-full bg-gray-200 rounded-t-3xl cursor-grab block"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{ height: OFFSET_MARGIN }}
        />
        <div className="px-6 h-full">{children}</div>
      </div>
    </>,
    document.body
  );
};

export default DraggableBottomSheet;
