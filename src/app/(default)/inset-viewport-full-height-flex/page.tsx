'use client';

import { useState } from 'react';

const BodyContent = () => {
  return (
    <div className="text-right">
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
      <div>body content</div>
    </div>
  );
};

/**
 * full height page에서 flex를 이용하여 가운데 영역만 스크롤 생기게 하는 레이아웃
 */
const Page = () => {
  const [headerWord, setHeaderWord] = useState('');
  const [footerWord, setFooterWord] = useState('');

  return (
    <>
      <BodyContent />

      {/* 모바일에서 inset-0을 쓰더라도 viewport height에 문제가 없는 것으로 보임 */}
      <div className="fixed inset-0 border-8 border-slate-300 flex flex-col">
        <header className="bg-slate-400 min-h-20 shrink-0">
          shrink 0 header{headerWord}
        </header>
        <main className="flex-shrink flex-grow overflow-y-auto">
          <div>first</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>
            <button onClick={() => setHeaderWord((word) => word + ' lorem')}>
              add text to header
            </button>
          </div>
          <div>
            <button onClick={() => setFooterWord((word) => word + ' lorem')}>
              add text to footer
            </button>
          </div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>center</div>
          <div>last</div>
        </main>
        <footer className="bg-slate-400 min-h-20 shrink-0">
          shrink 0 footer{footerWord}
        </footer>
      </div>
    </>
  );
};

export default Page;
