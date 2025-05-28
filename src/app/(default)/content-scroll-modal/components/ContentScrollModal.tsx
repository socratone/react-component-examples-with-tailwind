import { createPortal } from 'react-dom';

interface ContentScrollModalProps {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
  maxWidth: string;
  header?: React.ReactNode;
  footer: React.ReactNode;
}

const ContentScrollModal = ({
  open,
  onClose,
  children,
  maxWidth,
  header,
  footer,
}: ContentScrollModalProps) => {
  if (!open) return null;

  return createPortal(
    // Backdrop
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50 px-[40px]"
      onClick={onClose}
    >
      {/* Container */}
      <div
        className="flex-shrink bg-white rounded-lg shadow-lg w-full flex flex-col max-h-[calc(100vh-80px)]"
        style={{ maxWidth }}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex justify-end items-center min-h-12 border-b flex-shrink-0">
          {header ? <div className="flex-grow">{header}</div> : null}
          <button
            className="text-gray-500 hover:text-gray-800 size-8"
            onClick={onClose}
          >
            &times;
          </button>
        </header>
        <main className="overflow-y-auto flex-shrink">{children}</main>
        <footer className="border-t min-h-12 flex-shrink-0">{footer}</footer>
      </div>
    </div>,
    document.body
  );
};

export default ContentScrollModal;
