'use client';

import { useState } from 'react';

interface ChipAdderProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const ChipAdder = ({ value, onChange }: ChipAdderProps) => {
  const [inputValue, setInputValue] = useState('');
  const chips = value;

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && inputValue.length !== 0) {
      onChange([...value, inputValue]);
      setInputValue('');
    } else if (event.key === 'Backspace' && inputValue.length === 0) {
      const newValue = [...value];
      newValue.pop();
      onChange(newValue);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleChipClick = (clickedIndex: number) => {
    onChange(value.filter((_, index) => index !== clickedIndex));
  };

  return (
    <div className="border-2 border-black whitespace-pre-wrap text-lg p-1 flex gap-1 flex-wrap">
      {chips.map((chip, index) => (
        <span
          key={index}
          className="bg-slate-400 text-white rounded p-1 inline-block cursor-pointer"
          onClick={() => handleChipClick(index)}
        >
          {chip}
        </span>
      ))}
      <input
        className="flex-1 min-w-0"
        value={inputValue}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
};

export default ChipAdder;
