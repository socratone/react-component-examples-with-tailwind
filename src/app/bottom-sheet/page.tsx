'use client';

import { useState } from 'react';
import DraggableBottomSheet from './components/DraggableBottomSheet';
import BottomSheet from './components/BottomSheet';

const Page = () => {
  const [open, setOpen] = useState(false);
  const [draggableOpen, setDraggableOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col">
        <button onClick={() => setOpen(true)}>Bottom Sheet 열기</button>
        <button onClick={() => setDraggableOpen(true)}>
          Draggable Bottom Sheet 열기
        </button>
      </div>

      <BottomSheet open={open} onClose={() => setOpen(false)}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
        voluptas distinctio earum, voluptatem ad ex quae architecto quasi vitae
        velit adipisci incidunt ducimus odio, cum deleniti alias, iusto autem.
        Nam!
      </BottomSheet>
      <DraggableBottomSheet
        open={draggableOpen}
        onClose={() => setDraggableOpen(false)}
        initialTop={400}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
        voluptas distinctio earum, voluptatem ad ex quae architecto quasi vitae
        velit adipisci incidunt ducimus odio, cum deleniti alias, iusto autem.
        Nam!
      </DraggableBottomSheet>
    </>
  );
};

export default Page;
