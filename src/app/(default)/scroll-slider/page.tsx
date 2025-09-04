'use client';

import ScrollSlider from './components/ScrollSlider';

const Page = () => {
  const itemCount = 10;
  const items = Array.from({ length: itemCount }, (_, index) => index + 1);

  return (
    <div>
      <ScrollSlider itemWidth={100} itemCount={itemCount}>
        {items.map((item) => (
          <div
            key={item}
            className="w-[100px] h-64 border-8 shrink-0 flex items-center justify-center text-black text-xl font-bold"
          >
            {item}
          </div>
        ))}
      </ScrollSlider>
    </div>
  );
};

export default Page;
