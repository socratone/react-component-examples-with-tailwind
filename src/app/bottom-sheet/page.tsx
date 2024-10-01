'use client';

import { useState } from 'react';
import BottomSheet from './components/BottomSheet';

const Page = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>열기</button>

      <BottomSheet open={open} onClose={() => setOpen(false)}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
        voluptas distinctio earum, voluptatem ad ex quae architecto quasi vitae
        velit adipisci incidunt ducimus odio, cum deleniti alias, iusto autem.
        Nam!
      </BottomSheet>
    </>
  );
};

export default Page;
