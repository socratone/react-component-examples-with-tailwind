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
 * full height page에서 sticky를 이용하여 가운데 영역을 스크롤 하는 레이아웃
 */
const Page = () => {
  return (
    <>
      <BodyContent />

      {/* 모바일에서 inset-0을 쓰더라도 viewport height에 문제가 없는 것으로 보임 */}
      <div className="fixed inset-0 border-8 border-slate-300 overflow-y-auto">
        <header className="bg-slate-400 bg-opacity-90 sticky top-0 h-20">
          sticky header
        </header>
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
        <div>center</div>
        <div>last</div>
        <footer className="bg-slate-400 bg-opacity-90 sticky bottom-0 h-20">
          sticky footer
        </footer>
      </div>
    </>
  );
};

export default Page;
