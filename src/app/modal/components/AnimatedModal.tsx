import { createPortal } from 'react-dom';
import './modal-animation.css';
import { useEffect, useState } from 'react';

interface AnimatedModalProps {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
  maxWidth: string;
}

const AnimatedModal = ({
  open,
  onClose,
  children,
  maxWidth,
}: AnimatedModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animation, setAnimation] = useState<string>();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (open) {
      setIsVisible(true);
      setAnimation('fadeIn 0.3s ease-out');
    } else {
      setAnimation('fadeOut 0.3s ease-in');
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

  if (!isVisible) return null;

  const backDropClassName =
    'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50';

  const modalContainerClassName =
    'bg-white p-6 rounded-lg shadow-lg relative w-full overflow-y-auto m-[40px]';

  return createPortal(
    <div
      className={backDropClassName}
      onClick={onClose}
      style={{
        animation,
      }}
    >
      <div
        className={modalContainerClassName}
        style={{ maxHeight: 'calc(100vh - 80px)', maxWidth }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default AnimatedModal;
