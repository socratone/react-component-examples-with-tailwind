'use client';

import { useState } from 'react';
import ChipAdder from './components/ChipAdder';

const Page = () => {
  const [chips, setChips] = useState<string[]>([]);

  return <ChipAdder value={chips} onChange={setChips} />;
};

export default Page;
