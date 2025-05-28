'use client';

import { useState } from 'react';
import ContentScrollModal from './components/ContentScrollModal';

const Page = () => {
  const [contentScrollModalOpen, setContentScrollModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col">
        <button onClick={() => setContentScrollModalOpen(true)}>
          Content Scroll 모달 열기
        </button>
      </div>

      <ContentScrollModal
        open={contentScrollModalOpen}
        onClose={() => setContentScrollModalOpen(false)}
        maxWidth="400px"
        header={<div className="h-full pl-4">안녕하세요</div>}
        footer={
          <div className="flex justify-end items-center h-full px-4">
            <button className="bg-blue-400 text-white px-2 py-1 rounded-md">
              닫기
            </button>
          </div>
        }
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
      </ContentScrollModal>
    </>
  );
};

export default Page;
