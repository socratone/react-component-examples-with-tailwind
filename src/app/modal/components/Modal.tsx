import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
  maxWidth: string;
}

const Modal = ({ open, onClose, children, maxWidth }: ModalProps) => {
  if (!open) return null;

  const backdropClassName =
    'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50';

  const modalContainerClassName =
    'bg-white p-6 rounded-lg shadow-lg relative w-full overflow-y-auto m-[40px]';

  return createPortal(
    <div className={backdropClassName} onClick={onClose}>
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

export default Modal;
