/**
 * 그리기 도구 모듈
 *
 * 이 모듈은 사용자의 마우스 입력을 처리하고,
 * 캔버스에 그림을 그리는 기능을 제공합니다.
 */

import { CANVAS_CONFIG, GRID_SIZE, TOOLS } from "../config/constants.js";
import { setPixel } from "./pixelData.js";
import { render, getCanvas } from "./renderer.js";
import { saveState } from "../history/historyManager.js";

// ===== 상태 변수 =====
// 현재 그리기 중인지 여부
let isDrawing = false;

// 현재 선택된 색상
let currentColor = "#000000";

// 현재 선택된 도구
let currentTool = TOOLS.PENCIL;

/**
 * 현재 색상을 설정합니다
 *
 * @param {string} color - HEX 색상 코드
 */
export const setCurrentColor = (color) => {
  currentColor = color;
};

/**
 * 현재 색상을 가져옵니다
 *
 * @returns {string} 현재 색상
 */
export const getCurrentColor = () => currentColor;

/**
 * 현재 도구를 설정합니다
 *
 * @param {string} tool - 도구 타입 (TOOLS.PENCIL 또는 TOOLS.ERASER)
 */
export const setCurrentTool = (tool) => {
  currentTool = tool;
};

/**
 * 도구 동작 정의
 *
 * 각 도구마다 픽셀에 적용할 동작을 정의합니다.
 */
const toolActions = {
  // 연필: 현재 색상으로 픽셀을 칠합니다
  [TOOLS.PENCIL]: (x, y) => setPixel(x, y, currentColor),

  // 지우개: 픽셀을 null로 설정하여 지웁니다
  [TOOLS.ERASER]: (x, y) => setPixel(x, y, null),
};

/**
 * 마우스 이벤트의 좌표를 픽셀 좌표로 변환합니다
 *
 * @param {MouseEvent} e - 마우스 이벤트
 * @returns {{x: number, y: number}} 픽셀 좌표
 *
 * @example
 * // 마우스 위치가 (105, 115)px일 때
 * const { x, y } = getPixelCoordinates(event);
 * // x = 5 (105 / 20 = 5.25 → floor = 5)
 * // y = 5 (115 / 20 = 5.75 → floor = 5)
 */
const getPixelCoordinates = (e) => {
  const canvas = getCanvas();
  const rect = canvas.getBoundingClientRect();

  // 캔버스 내에서의 마우스 위치 계산
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  // 픽셀 좌표로 변환 (정수로 내림)
  const x = Math.floor(mouseX / CANVAS_CONFIG.pixelSize);
  const y = Math.floor(mouseY / CANVAS_CONFIG.pixelSize);

  return { x, y };
};

/**
 * 특정 위치에 현재 도구를 적용합니다
 *
 * @param {MouseEvent} e - 마우스 이벤트
 */
const draw = (e) => {
  const { x, y } = getPixelCoordinates(e);

  // 범위 체크: 캔버스 범위 내에서만 그립니다
  if (x >= 0 && x < GRID_SIZE.width && y >= 0 && y < GRID_SIZE.height) {
    // 현재 도구의 동작을 실행
    toolActions[currentTool](x, y);

    // 캔버스를 다시 그립니다
    render();
  }
};

/**
 * 그리기 이벤트 리스너를 초기화합니다
 *
 * 이 함수는 애플리케이션 시작 시 한 번만 호출되어야 합니다.
 */
export const initDrawingEvents = () => {
  const canvas = getCanvas();

  /**
   * 마우스 버튼을 눌렀을 때
   * - 그리기 시작
   * - 현재 상태를 히스토리에 저장 (Undo/Redo용)
   * - 첫 픽셀 그리기
   */
  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    saveState(); // Undo를 위해 현재 상태 저장
    draw(e);
  });

  /**
   * 마우스를 움직일 때
   * - 그리기 중일 때만 연속으로 그립니다
   */
  canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
      draw(e);
    }
  });

  /**
   * 마우스 버튼을 뗐을 때
   * - 그리기 종료
   */
  canvas.addEventListener("mouseup", () => {
    isDrawing = false;
  });

  /**
   * 마우스가 캔버스를 벗어났을 때
   * - 그리기 종료
   * - 캔버스 밖에서 마우스를 떼어도 그리기가 멈춥니다
   */
  canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
  });
};
