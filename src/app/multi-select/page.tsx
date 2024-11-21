'use client';

import { useState } from 'react';
import MultiSelect from './MultiSelect';
import Polygon from './polygon.svg';

const Page = () => {
  const [values, setValues] = useState<{ value: string; label: string }[]>([]);

  return (
    <>
      <MultiSelect
        values={values}
        onChange={setValues}
        options={[
          { value: '1', label: '가나다라마바사 아자차카타파하' },
          { value: '2', label: 'ABCDEFG' },
          { value: '3', label: '원숭이' },
          { value: '4', label: '토끼' },
        ]}
        maxVisible={3}
        placeholder="값을 선택하세요"
      />
    </>
  );
};

export default Page;
