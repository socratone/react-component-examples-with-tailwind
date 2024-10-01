'use client';

import { useState } from 'react';
import Modal from './components/Modal';

const Page = () => {
  const [basicModalOpen, setBasicModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setBasicModalOpen(true)}>기본 모달 열기</button>

      <Modal
        open={basicModalOpen}
        onClose={() => setBasicModalOpen(false)}
        maxWidth="400px"
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit a
        excepturi accusantium est! Quibusdam totam molestias saepe accusamus
        labore quidem facilis quaerat harum, fugit, quae animi aut doloremque,
        illo a. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Dignissimos minus assumenda rerum! Fugit odio sequi ea repellat! Aperiam
        dolorem ratione rem nesciunt dignissimos, harum officiis sint impedit
        sed magnam non. Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Qui numquam esse magnam perspiciatis, assumenda quis ipsa quod
        doloribus sapiente eos consectetur deserunt tenetur veritatis culpa
        impedit, id molestias perferendis facere.
      </Modal>
    </>
  );
};

export default Page;
