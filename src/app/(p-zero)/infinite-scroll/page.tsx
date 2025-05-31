'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
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

/**
 * 무한 스크롤 기능이 구현된 페이지 컴포넌트
 */
const Page = () => {
  // 마지막 요소를 감지하기 위한 ref
  const observerRef = useRef<HTMLDivElement>(null);

  // useInfiniteQuery를 사용하여 무한 스크롤 구현
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<Student[]>({
      queryKey: ['students'],
      // pageParam을 사용하여 다음 페이지 데이터 요청
      queryFn: ({ pageParam = 0 }) => getStudents(20, Number(pageParam)),
      // 다음 페이지 파라미터 계산
      getNextPageParam: (lastPage, allPages): number | undefined => {
        // 마지막 페이지가 비어있거나 20개 미만이면 더 이상 데이터가 없음
        if (lastPage.length === 0 || lastPage.length < 20) return undefined;
        // 다음 페이지의 offset 계산
        return allPages.flat().length;
      },
      // 초기 페이지 파라미터 설정
      initialPageParam: 0,
    });

  // Intersection Observer를 사용하여 무한 스크롤 구현
  useEffect(() => {
    // rootMargin을 사용하여 요소가 화면에 보이기 전에 미리 로드하도록 설정
    const observer = new IntersectionObserver(
      (entries) => {
        // 관찰 대상이 화면에 보이기 전이라도, 다음 페이지가 있으며, 현재 페이지를 가져오는 중이 아닐 때
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage(); // 다음 페이지 데이터 요청
        }
      },
      {
        // rootMargin을 사용하여 요소가 화면 하단에서 400px 전에 미리 로드하도록 설정
        rootMargin: '0px 0px 400px 0px',
        threshold: 0, // 요소가 조금이라도 보이면 즉시 콜백 실행
      }
    );

    // 관찰 대상 요소가 있으면 관찰 시작
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    // 컴포넌트 언마운트 시 관찰 중단
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div>
      {/* 모든 페이지의 데이터를 flat()으로 평탄화하여 렌더링 */}
      {data?.pages.flat().map((student: Student, index: number) => (
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

      {/* 로딩 상태 표시 */}
      {isLoading && (
        <div className="p-4 text-center">데이터를 불러오는 중...</div>
      )}

      {/* 다음 페이지 로딩 상태 표시 */}
      {isFetchingNextPage && (
        <div className="p-4 text-center">추가 데이터를 불러오는 중...</div>
      )}

      {/* 관찰 대상 요소 - 스크롤 시 이 요소가 보이면 다음 페이지 로드 */}
      <div ref={observerRef} />
    </div>
  );
};

export default Page;
