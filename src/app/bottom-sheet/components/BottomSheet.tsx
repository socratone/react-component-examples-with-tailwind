import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './bottom-sheet-animation.css';
import throttle from 'lodash/throttle';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const DRAGGABLE_BUTTON_HEIGHT = 48;

const BottomSheet = ({ open, onClose, children }: BottomSheetProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [containerAnimation, setContainerAnimation] = useState<string>();
  const [backdropAnimation, setBackdropAnimation] = useState<string>();

  const [top, setTop] = useState(400);
  const topRef = useRef(400);
  const dragStartY = useRef<number | null>(null); // 드래그 시작 위치
  const dragOffsetY = useRef<number | null>(null); // top과 클릭 위치 offset

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

  /**
   * 마우스 이동에 따라 top 업데이트
   */
  const throttledMouseMove = useCallback(
    throttle((event: MouseEvent) => {
      if (typeof dragOffsetY.current === 'number') {
        const newTop = event.clientY - dragOffsetY.current;

        // viewport 위로 넘어가지 않도록
        if (newTop < 0) {
          setTop(0);
          topRef.current = 0;
          return;
        }

        // viewport 아래로 내려가지 않도록
        if (newTop > window.innerHeight - DRAGGABLE_BUTTON_HEIGHT) {
          setTop(window.innerHeight - DRAGGABLE_BUTTON_HEIGHT);
          topRef.current = window.innerHeight - DRAGGABLE_BUTTON_HEIGHT;
          return;
        }

        setTop(newTop);
        topRef.current = newTop;
      }
    }, 50),
    []
  );

  /**
   * 드래그 종료
   */
  const handleMouseUp = useCallback(() => {
    dragStartY.current = null;
    dragOffsetY.current = null;

    window.removeEventListener('mousemove', throttledMouseMove); // mousemove 이벤트 해제
    window.removeEventListener('mouseup', handleMouseUp); // mouseup 이벤트 해제
  }, []);

  /**
   * 드래그 시작
   */
  const handleMouseDown = (event: React.MouseEvent) => {
    // 드래그 시작 지점 기록
    dragStartY.current = event.clientY;
    dragOffsetY.current = event.clientY - top;

    window.addEventListener('mousemove', throttledMouseMove); // window에서 mousemove 감지
    window.addEventListener('mouseup', handleMouseUp); // window에서 mouseup 감지
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
        className="fixed bottom-0 inset-x-0 bg-white rounded-t-3xl shadow-lg"
        style={{
          animation: containerAnimation,
          top,
          transition: 'top 0.3s ease-out',
        }}
      >
        {/* Draggable Button */}
        <button
          className="w-full bg-gray-200 rounded-t-3xl cursor-grab block"
          onMouseDown={handleMouseDown}
          style={{ height: DRAGGABLE_BUTTON_HEIGHT }}
        />
        <div className="px-6 h-full">{children}</div>
      </div>
    </>,
    document.body
  );
};

export default BottomSheet;
