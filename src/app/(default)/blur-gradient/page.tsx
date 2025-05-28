'use client';

const Page = () => {
  return (
    <>
      <div className="relative">
        {/* Blur + Gradient 레이어 */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 200px)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 200px)',
          }}
        ></div>
        <p>blurred text</p>
        <p>blurred text</p>
        <p>blurred text</p>
        <p>blurred text</p>
        <p>blurred text</p>
        <p>blurred text</p>
        <p>blurred text</p>
        <p>blurred text</p>
        <p>blurred text</p>
        <p>blurred text</p>
        <p>blurred text</p>
        <p>blurred text</p>
        <p>blurred text</p>
        <p>blurred text</p>
        <p>blurred text</p>
        <p>blurred text</p>
        <p>blurred text</p>
        <p>blurred text</p>
        <p>blurred text</p>
        <p>blurred text</p>
      </div>
    </>
  );
};

export default Page;
