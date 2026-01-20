/**
 * 픽셀 데이터 관리 모듈
 *
 * 이 모듈은 픽셀 아트의 실제 데이터를 관리합니다.
 * 2D 배열 형태로 각 픽셀의 색상 정보를 저장합니다.
 */

import { GRID_SIZE } from "../config/constants.js";

/**
 * 픽셀 데이터를 저장하는 2D 배열
 *
 * 구조: pixelData[y][x] = color
 * - y: 세로 좌표 (0 ~ gridHeight-1)
 * - x: 가로 좌표 (0 ~ gridWidth-1)
 * - color: HEX 색상 코드 (예: "#FF0000") 또는 null (빈 픽셀)
 *
 * 예시:
 * pixelData[0][0] = "#FF0000"  // 왼쪽 상단 픽셀을 빨간색으로
 * pixelData[5][10] = null      // (10, 5) 위치 픽셀을 지움
 */
export const pixelData = Array(GRID_SIZE.height)
  .fill(null)
  .map(() => Array(GRID_SIZE.width).fill(null));

/**
 * 특정 위치의 픽셀 색상을 설정합니다
 *
 * @param {number} x - 가로 좌표 (0 ~ gridWidth-1)
 * @param {number} y - 세로 좌표 (0 ~ gridHeight-1)
 * @param {string|null} color - HEX 색상 코드 또는 null
 *
 * @example
 * setPixel(5, 5, "#FF0000");  // (5, 5) 위치를 빨간색으로
 * setPixel(5, 5, null);       // (5, 5) 위치를 지움
 */
export const setPixel = (x, y, color) => {
  // 범위 체크: 배열 범위를 벗어나면 무시
  if (x >= 0 && x < GRID_SIZE.width && y >= 0 && y < GRID_SIZE.height) {
    pixelData[y][x] = color;
  }
};

/**
 * 특정 위치의 픽셀 색상을 가져옵니다
 *
 * @param {number} x - 가로 좌표
 * @param {number} y - 세로 좌표
 * @returns {string|null} 색상 코드 또는 null
 */
export const getPixel = (x, y) => {
  if (x >= 0 && x < GRID_SIZE.width && y >= 0 && y < GRID_SIZE.height) {
    return pixelData[y][x];
  }
  return null;
};

/**
 * 모든 픽셀 데이터를 초기화합니다
 */
export const clearAllPixels = () => {
  for (let y = 0; y < GRID_SIZE.height; y++) {
    for (let x = 0; x < GRID_SIZE.width; x++) {
      pixelData[y][x] = null;
    }
  }
};
