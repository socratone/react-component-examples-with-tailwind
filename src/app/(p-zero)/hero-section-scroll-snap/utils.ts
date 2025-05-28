/**
 * 선형 값(0~1)을 이징 함수를 적용하여 변환하는 유틸리티 함수들
 */

/**
 * 선형 값(0~1)에 ease-in-out 효과를 적용하는 함수
 * 0과 1 양 끝으로 갈수록 변화가 적고 중간에서 변화가 더 큰 곡선 생성
 * @param value - 0과 1 사이의 선형 값
 * @returns 이징이 적용된 0과 1 사이의 값
 */
export const applyEaseInOut = (value: number): number => {
  // 입력값을 0~1 범위로 제한
  const clampedValue = Math.min(1, Math.max(0, value));

  // 코사인 기반 ease-in-out 함수 적용
  // 양 끝에서는 변화가 적고 중간에서 변화가 큰 곡선 생성
  return (1 - Math.cos(Math.PI * clampedValue)) / 2;
};

/**
 * 선형 값(0~1)에 cubic ease-in-out 효과를 적용하는 함수
 * 0과 1 양 끝으로 갈수록 변화가 적고 중간에서 변화가 더 큰 곡선 생성
 * @param value - 0과 1 사이의 선형 값
 * @returns 이징이 적용된 0과 1 사이의 값
 */
export const applyCubicEaseInOut = (value: number): number => {
  // 입력값을 0~1 범위로 제한
  const clampedValue = Math.min(1, Math.max(0, value));

  // cubic ease-in-out 함수 적용
  return clampedValue < 0.5
    ? 4 * clampedValue * clampedValue * clampedValue
    : 1 - Math.pow(-2 * clampedValue + 2, 3) / 2;
};

/**
 * 선형 값(0~1)에 ease-in 효과를 적용하는 함수
 * 시작부분에서는 변화가 적고 끝으로 갈수록 변화가 큰 곡선 생성
 * @param value - 0과 1 사이의 선형 값
 * @returns 이징이 적용된 0과 1 사이의 값
 */
export const applyEaseIn = (value: number): number => {
  // 입력값을 0~1 범위로 제한
  const clampedValue = Math.min(1, Math.max(0, value));

  // ease-in 함수 적용 (2차 함수)
  return clampedValue * clampedValue;
};

/**
 * 선형 값(0~1)에 ease-out 효과를 적용하는 함수
 * 시작부분에서는 변화가 크고 끝으로 갈수록 변화가 적은 곡선 생성
 * @param value - 0과 1 사이의 선형 값
 * @returns 이징이 적용된 0과 1 사이의 값
 */
export const applyEaseOut = (value: number): number => {
  // 입력값을 0~1 범위로 제한
  const clampedValue = Math.min(1, Math.max(0, value));

  // ease-out 함수 적용
  return 1 - Math.pow(1 - clampedValue, 2);
};
