import { useEffect, useRef, useState } from 'react';

interface MenuProps {
  items: {
    label: string;
    onClick: () => void;
  }[];
}

const Menu = ({ items }: MenuProps) => {
  const menuListRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);

  /** 메뉴 바깥 영역을 클릭했을 때 메뉴를 닫기 위한 함수 */
  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuListRef.current &&
      // 클릭된 요소가 해당 메뉴 안에 포함되지 않는 경우
      !menuListRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 document에 마우스 다운 이벤트 리스너를 추가하여
    // handleClickOutside 함수를 호출하게 함
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거하여 메모리 누수를 방지
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        className="rounded bg-slate-200 p-2"
        onClick={() => setOpen(true)}
      >
        열기
      </button>
      {open ? (
        <ul
          ref={menuListRef}
          className="absolute top-full left-0 rounded min-w-40 shadow-xl border border-slate-300 bg-white overflow-hidden"
        >
          {items.map((item) => (
            <li
              key={item.label}
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              className="min-h-3 cursor-pointer p-2 hover:bg-slate-100"
            >
              {item.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Menu;
