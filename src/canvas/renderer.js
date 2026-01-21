/**
 * 캔버스 렌더링 모듈
 *
 * 이 모듈은 픽셀 데이터를 실제 캔버스에 그리는 역할을 합니다.
 * Canvas API를 사용하여 픽셀과 그리드를 렌더링합니다.
 */

import $ from "jquery";
import { CANVAS_CONFIG, GRID_SIZE, GRID_STYLE } from "../config/constants.js";
import { pixelData } from "./pixelData.js";

// ===== jQuery로 캔버스 요소 선택 =====
// $('#id'): ID로 요소 선택
// .get(0) 또는 [0]: jQuery 객체에서 실제 DOM 요소 추출
// Canvas API는 실제 DOM 요소가 필요하므로 [0] 사용
const $canvas = $("#pixelCanvas");
const canvas = $canvas[0]; // jQuery 객체 → DOM 요소
const ctx = canvas.getContext("2d");

// 이미지 스무딩 비활성화
// 픽셀 아트를 선명하게 유지하기 위해 필수!
// false로 설정하면 확대 시에도 픽셀이 흐려지지 않습니다
ctx.imageSmoothingEnabled = false;

/**
 * 그리드 선을 그립니다
 *
 * 캔버스에 세로선과 가로선을 그려서 픽셀 경계를 표시합니다.
 * 사용자가 어디에 그릴지 쉽게 파악할 수 있습니다.
 */
const drawGrid = () => {
  // 그리드 선 스타일 설정
  ctx.strokeStyle = GRID_STYLE.strokeColor;
  ctx.lineWidth = GRID_STYLE.lineWidth;

  // 세로선 그리기 (왼쪽에서 오른쪽으로)
  for (let x = 0; x <= GRID_SIZE.width; x++) {
    ctx.beginPath();
    // 시작점: (x * pixelSize, 0)
    ctx.moveTo(x * CANVAS_CONFIG.pixelSize, 0);
    // 끝점: (x * pixelSize, canvas.height)
    ctx.lineTo(x * CANVAS_CONFIG.pixelSize, canvas.height);
    ctx.stroke();
  }

  // 가로선 그리기 (위에서 아래로)
  for (let y = 0; y <= GRID_SIZE.height; y++) {
    ctx.beginPath();
    // 시작점: (0, y * pixelSize)
    ctx.moveTo(0, y * CANVAS_CONFIG.pixelSize);
    // 끝점: (canvas.width, y * pixelSize)
    ctx.lineTo(canvas.width, y * CANVAS_CONFIG.pixelSize);
    ctx.stroke();
  }
};

/**
 * 전체 캔버스를 렌더링합니다
 *
 * 이 함수는 다음 작업을 수행합니다:
 * 1. 캔버스를 완전히 지움
 * 2. pixelData 배열을 순회하며 색칠된 픽셀을 그림
 * 3. 그리드 선을 그림
 *
 * 매번 완전히 다시 그리는 방식이므로,
 * 변경사항이 있을 때마다 호출하면 됩니다.
 */
export const render = () => {
  // 1단계: 캔버스 전체를 지웁니다
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2단계: 픽셀 데이터를 순회하며 그립니다
  for (let y = 0; y < GRID_SIZE.height; y++) {
    for (let x = 0; x < GRID_SIZE.width; x++) {
      const color = pixelData[y][x];

      // 색상이 있는 픽셀만 그립니다 (null은 건너뜀)
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(
          x * CANVAS_CONFIG.pixelSize, // 캔버스 x 좌표
          y * CANVAS_CONFIG.pixelSize, // 캔버스 y 좌표
          CANVAS_CONFIG.pixelSize, // 폭
          CANVAS_CONFIG.pixelSize // 높이
        );
      }
    }
  }

  // 3단계: 그리드를 그립니다
  drawGrid();
};

/**
 * 캔버스 컨텍스트를 반환합니다
 * (다른 모듈에서 필요할 경우 사용)
 */
export const getCanvasContext = () => ctx;

/**
 * 캔버스 DOM 요소를 반환합니다
 */
export const getCanvas = () => canvas;

/**
 * jQuery로 감싼 캔버스 객체를 반환합니다
 * jQuery 메서드를 사용하고 싶을 때 활용
 */
export const get$Canvas = () => $canvas;
