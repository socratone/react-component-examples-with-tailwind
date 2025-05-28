'use client';

import Image from '@tiptap/extension-image';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const CONTENT = `
<div><img src="/images/forest.png" alt="random"></div>
<p>여기에 글을 작성하세요</p>
`;

const Page = () => {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: CONTENT,
  });

  const handleSubmit = () => {
    if (!editor) return;

    const content = editor.getHTML(); // 에디터의 HTML 콘텐츠 가져오기

    console.log(content);
  };

  return (
    <div className="flex flex-col gap-2">
      <EditorContent
        className="p-4 border border-gray-300 rounded-md"
        editor={editor}
      />

      <button
        className="rounded-md bg-blue-500 text-white py-2 px-3 self-end"
        onClick={handleSubmit}
      >
        제출
      </button>
    </div>
  );
};

export default Page;
