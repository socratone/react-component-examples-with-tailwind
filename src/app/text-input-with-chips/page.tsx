'use client';

import { useState } from 'react';
import ChipAdder from './components/ChipAdder';

const Page = () => {
  const [chips, setChips] = useState<string[]>([]);

  return (
    <div className="m-8">
      <ChipAdder value={chips} onChange={setChips} />
    </div>
  );
};

export default Page;
