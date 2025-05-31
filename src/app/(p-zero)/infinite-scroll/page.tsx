'use client';

import { Student } from '@/app/api/students/route';
import InfiniteList from './InfiniteList';
import { cn } from '@/utils/cn';
import { useRef } from 'react';

/**
 * 학생 데이터를 가져오는 함수
 * @param size - 가져올 학생 데이터의 수량 (기본값: 20)
 * @param offset - 가져올 데이터의 시작 위치 (기본값: 0)
 * @returns 학생 데이터 배열을 반환하는 Promise
 */
const getStudents = async (
  size: number = 20,
  offset: number = 0
): Promise<Student[]> => {
  // URL 파라미터 구성
  const params = new URLSearchParams({
    size: size.toString(),
    offset: offset.toString(),
  });

  const response = await fetch(`/api/students?${params.toString()}`);
  return response.json();
};

/**
 * 무한 스크롤 기능이 구현된 페이지 컴포넌트
 */
const Page = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quae
        neque, voluptatibus, reprehenderit laudantium et alias asperiores, quam
        tenetur repellendus repellat voluptas animi? Adipisci iste saepe
        repellendus maxime blanditiis eius!
      </div>
      <div className="h-screen overflow-y-auto" ref={scrollContainerRef}>
        <InfiniteList
          queryKey={['students']}
          queryFn={({ pageParam = 0 }) => getStudents(20, Number(pageParam))}
          renderItem={(item, index) => (
            <div
              className={cn('h-[10vh] flex items-center justify-center', {
                'bg-red-200': index % 5 === 0,
                'bg-yellow-200': index % 5 === 1,
                'bg-green-200': index % 5 === 2,
                'bg-blue-200': index % 5 === 3,
                'bg-purple-200': index % 5 === 4,
              })}
            >
              {item.name}
            </div>
          )}
          scrollContainerRef={scrollContainerRef}
          getItemKey={(item) => item.id}
          loadingComponent={
            <div className="h-[10vh] flex items-center justify-center">
              기다려봐!
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Page;
