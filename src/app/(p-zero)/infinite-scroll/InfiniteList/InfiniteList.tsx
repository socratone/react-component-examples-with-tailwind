import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, ReactNode } from 'react';

interface InfiniteListProps<TData extends { id?: string | number }> {
  /**
   * React Query에서 사용할 쿼리 키
   * 이 키를 기준으로 쿼리 캐싱 및 무효화가 이루어짐
   */
  queryKey: string[];
  /**
   * 데이터를 가져오는 비동기 함수
   * @param pageParam - 현재 페이지 파라미터(오프셋)
   * @returns Promise<TData[]> - 데이터 배열을 반환하는 Promise
   */
  queryFn: ({ pageParam }: { pageParam: number }) => Promise<TData[]>;
  /**
   * 각 아이템을 렌더링하는 함수
   * @param item - 렌더링할 아이템 데이터
   * @param index - 아이템의 인덱스
   * @returns ReactNode - 렌더링할 컴포넌트
   */
  renderItem: (item: TData, index: number) => ReactNode;
  /**
   * 각 아이템의 고유 키를 생성하는 함수
   * 제공되지 않을 경우 기본적으로 item.id 또는 index를 사용
   * @param item - 키를 생성할 아이템 데이터
   * @param index - 아이템의 인덱스
   * @returns string | number - 고유 키 값
   */
  getItemKey?: (item: TData, index: number) => string | number;
  /**
   * 한 페이지에 표시할 아이템 수
   * @default 20
   */
  pageSize?: number;
  /**
   * 스크롤 컨테이너에 대한 ref
   * 기본값은 viewport(window)이지만, 다른 스크롤 컨테이너를 사용할 경우 이 ref를 제공해야 함
   */
  scrollContainerRef?: React.RefObject<HTMLElement>;
  /**
   * 스크롤 컨테이너 요소 직접 전달
   * scrollContainerRef와 함께 사용될 경우 scrollContainer가 우선순위를 가짐
   */
  scrollContainer?: HTMLElement;
  className?: string;
}

const InfiniteList = <TData extends { id?: string | number }>({
  queryKey,
  queryFn,
  renderItem,
  getItemKey,
  pageSize = 20,
  scrollContainerRef,
  scrollContainer,
  className,
}: InfiniteListProps<TData>) => {
  // 마지막 요소를 감지하기 위한 ref
  const observerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn({ pageParam }),
    getNextPageParam: (lastPage, allPages): number | undefined => {
      // 마지막 페이지가 비어있거나 pageSize 미만이면 더 이상 데이터가 없음
      if (lastPage.length === 0 || lastPage.length < pageSize) return undefined;
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
        // scrollContainer가 있으면 우선 사용하고, 없으면 scrollContainerRef 사용
        root: scrollContainer ?? scrollContainerRef?.current ?? null,
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
    <div className={className}>
      {/* 모든 페이지의 데이터를 flat()으로 평탄화하여 렌더링 */}
      {data?.pages.flat().map((item: TData, index: number) => (
        <React.Fragment key={getItemKey ? getItemKey(item, index) : (item.id === undefined ? index : item.id)}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}

      {/* 로딩 상태 표시 */}
      {isLoading && (
        <div className="p-4 text-center">데이터를 불러오는 중...</div>
      )}

      {/* 다음 페이지 로딩 상태 표시 */}
      {isFetchingNextPage && (
        <div className="p-4 text-center">추가 데이터를 불러오는 중...</div>
      )}

      {/* 에러 상태 표시 */}
      {isError && (
        <div className="p-4 text-center text-red-500">
          {error?.message || '알 수 없는 오류'}
        </div>
      )}

      {/* 관찰 대상 요소 - 스크롤 시 이 요소가 보이면 다음 페이지 로드 */}
      {/* 최소한의 가시성을 위해 4px */}
      {hasNextPage !== false && (
        <div ref={observerRef} className="w-full h-[4px]" />
      )}
    </div>
  );
};

export default InfiniteList;
