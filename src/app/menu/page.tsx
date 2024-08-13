'use client';

import { useState } from 'react';
import Menu from './components/Menu';

const Page = () => {
  const [clickedMenu, setClickedMenu] = useState('');

  return (
    <div>
      <Menu
        items={[
          {
            label: '메뉴 1',
            onClick: () => {
              setClickedMenu('메뉴 1');
            },
          },
          {
            label: '메뉴 2',
            onClick: () => {
              setClickedMenu('메뉴 2');
            },
          },
        ]}
      />
      <p className="mt-40">clickedMenu: {clickedMenu}</p>
    </div>
  );
};

export default Page;
