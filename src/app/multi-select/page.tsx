'use client';

import { useState } from 'react';
import MultiSelect from './MultiSelect';

const Page = () => {
  const [values, setValues] = useState<{ value: string; label: string }[]>([]);

  return (
    <>
      <MultiSelect
        values={values}
        onChange={setValues}
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
          { value: 'option4', label: 'Option 4' },
        ]}
      />
    </>
  );
};

export default Page;
