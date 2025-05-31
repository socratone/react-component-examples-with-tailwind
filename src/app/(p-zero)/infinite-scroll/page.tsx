'use client';

import { useQuery } from '@tanstack/react-query';
import { Student } from '@/app/api/students/route';
import { cn } from '@/utils/cn';

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

const Page = () => {
  const { data } = useQuery<Student[]>({
    queryKey: ['students'],
    queryFn: () => getStudents(20, 0),
  });

  return (
    <div>
      {data &&
        data.map((student: Student, index: number) => (
          <div
            key={student.id}
            className={cn('h-[10vh] flex items-center justify-center', {
              'bg-red-200': index % 5 === 0,
              'bg-yellow-200': index % 5 === 1,
              'bg-green-200': index % 5 === 2,
              'bg-blue-200': index % 5 === 3,
              'bg-purple-200': index % 5 === 4,
            })}
          >
            {student.name}
          </div>
        ))}
    </div>
  );
};

export default Page;
