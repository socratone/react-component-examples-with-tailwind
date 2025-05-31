import { NextRequest, NextResponse } from 'next/server';

/**
 * 학생 데이터 타입 정의
 * @interface Student
 * @property {number} id - 학생 고유 식별자
 * @property {string} name - 학생 이름
 */
export type Student = {
  id: number;
  name: string;
};

/**
 * 목데이터 생성 (200개)
 * 학생 정보를 담은 배열
 */
export const STUDENTS: Student[] = Array.from({ length: 200 }, (_, index) => ({
  id: index + 1,
  name: `학생 ${index + 1}`,
}));

/**
 * GET 요청 처리 함수
 * @param {NextRequest} request - 클라이언트의 요청 객체
 * @returns {NextResponse} - 페이징 처리된 학생 데이터 또는 에러 메시지
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // URL에서 searchParams 객체 가져오기
    const searchParams = request.nextUrl.searchParams;
    
    // offset과 size 쿼리 파라미터 추출
    const offset = parseInt(searchParams.get('offset') || '0');
    const size = parseInt(searchParams.get('size') || '10');

    // 유효성 검사
    if (offset < 0 || size <= 0) {
      return NextResponse.json(
        { message: '유효하지 않은 파라미터입니다.' },
        { status: 400 }
      );
    }

    // 데이터 페이징 처리
    const paginatedStudents = STUDENTS.slice(offset, offset + size);

    // 결과 반환
    return NextResponse.json(paginatedStudents, { status: 200 });
  } catch (error) {
    console.error('학생 데이터 조회 중 오류 발생:', error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
