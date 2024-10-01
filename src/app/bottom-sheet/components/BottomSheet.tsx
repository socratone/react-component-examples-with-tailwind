import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './bottom-sheet-animation.css';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet = ({ open, onClose, children }: BottomSheetProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [containerAnimation, setContainerAnimation] = useState<string>();
  const [backdropAnimation, setBackdropAnimation] = useState<string>();

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
        className="fixed bottom-0 inset-x-0 bg-white p-6 rounded-t-3xl shadow-lg"
        style={{ animation: containerAnimation }}
      >
        {children}
      </div>
    </>,
    document.body
  );
};

export default BottomSheet;
