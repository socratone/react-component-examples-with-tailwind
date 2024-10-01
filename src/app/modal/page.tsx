'use client';

import { useState } from 'react';
import Modal from './components/Modal';
import AnimatedModal from './components/AnimatedModal';

const Page = () => {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [animatedModalOpen, setAnimatedModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col">
        <button onClick={() => setBasicModalOpen(true)}>기본 모달 열기</button>
        <button onClick={() => setAnimatedModalOpen(true)}>
          애니메이션 모달 열기
        </button>
      </div>

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

      <AnimatedModal
        open={animatedModalOpen}
        onClose={() => setAnimatedModalOpen(false)}
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
      </AnimatedModal>
    </>
  );
};

export default Page;
