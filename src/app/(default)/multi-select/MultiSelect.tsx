import { useState, useEffect, useRef } from 'react';

type Option = {
  value: string;
  label: string;
};

interface MultiSelectProps {
  options: Option[];
  values: Option[];
  onChange: (values: Option[]) => void;
  maxWidth?: string;
  placeholder?: string;
  maxVisible?: number;
}

export default function MultiSelect({
  options,
  values,
  onChange,
  maxWidth,
  placeholder,
  maxVisible = 2,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOption = (option: Option) => {
    const isOptionSelected = values.some(({ value }) => value === option.value);
    const newValues = isOptionSelected
      ? values.filter(({ value }) => value !== option.value)
      : [...values, option];
    onChange(newValues);
  };

  const isSelected = (option: Option) =>
    values.some(({ value }) => value === option.value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef} style={{ maxWidth }}>
      <button
        type="button"
        className="relative border border-gray-300 rounded-md p-2 w-full text-left cursor-pointer bg-white flex items-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span
          className="truncate"
          style={{
            maxWidth: 'calc(100% - 40px)',
          }}
        >
          {values.length > 0 ? (
            <>
              {values
                .slice(0, maxVisible)
                .map((opt) => opt.label)
                .join(', ')}
            </>
          ) : (
            <span className="text-gray-400">
              {placeholder ?? 'Select options'}
            </span>
          )}
        </span>

        <span className="ml-auto">
          {values.length > maxVisible && (
            <span className=" rounded-lg bg-slate-300 p-1 whitespace-nowrap">
              +{values.length - maxVisible}
            </span>
          )}
          <span className="ml-2">{isOpen ? '▲' : '▼'}</span>
        </span>
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full border border-gray-300 rounded-md bg-white shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option.value}
              className={`p-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                isSelected(option) ? 'bg-blue-100' : ''
              }`}
              onClick={() => toggleOption(option)}
            >
              <span className="truncate" style={{ maxWidth: '90%' }}>
                {option.label}
              </span>
              <div className="ml-2">{isSelected(option) && <div>v</div>}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
