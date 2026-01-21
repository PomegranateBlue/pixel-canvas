/**
 * 히스토리 관리 모듈 (Undo/Redo)
 *
 * 이 모듈은 사용자의 작업 기록을 관리하여
 * "되돌리기(Undo)"와 "다시하기(Redo)" 기능을 제공합니다.
 * jQuery 4를 사용하여 키보드 이벤트를 처리합니다.
 */

import $ from "jquery";
import { pixelData } from "../canvas/pixelData.js";
import { render } from "../canvas/renderer.js";
import { GRID_SIZE } from "../config/constants.js";

/**
 * 작업 히스토리를 저장하는 배열
 *
 * 각 요소는 특정 시점의 pixelData 전체 복사본입니다.
 * @type {Array<Array<Array<string|null>>>}
 */
const history = [];

/**
 * 현재 히스토리 위치
 *
 * history 배열에서 현재 보고 있는 인덱스입니다.
 * - 초기값: -1 (히스토리 없음)
 * - Undo 시 감소
 * - Redo 시 증가
 * @type {number}
 */
let historyStep = -1;

/**
 * 현재 상태를 히스토리에 저장합니다
 *
 * 그리기 시작 시 호출되어, 나중에 Undo로 돌아갈 수 있게 합니다.
 *
 * 작동 방식:
 * 1. historyStep을 1 증가
 * 2. historyStep 이후의 모든 기록 삭제 (새 분기 시작)
 * 3. 현재 pixelData의 복사본을 저장
 *
 * @example
 * // 사용자가 그리기 시작
 * saveState(); // 현재 상태 저장
 * // 사용자가 그림을 그림
 * // Ctrl+Z로 saveState() 시점으로 돌아갈 수 있음
 */
export const saveState = () => {
  // 다음 히스토리 위치로 이동
  historyStep++;

  // 현재 위치 이후의 히스토리 삭제
  // 예: [A, B, C]에서 B로 Undo 후 새로운 작업을 하면
  //     [A, B, D]가 되어야 하므로 C를 삭제
  history.length = historyStep;

  // 현재 pixelData의 깊은 복사본을 저장
  // JSON 방식으로 완전히 새로운 배열을 생성합니다
  // (참조가 아닌 값 복사)
  history.push(JSON.parse(JSON.stringify(pixelData)));
};

/**
 * 특정 히스토리 상태를 불러옵니다
 *
 * @param {Array<Array<string|null>>} state - 불러올 픽셀 데이터 상태
 */
const loadState = (state) => {
  // pixelData 배열을 저장된 상태로 복원
  for (let y = 0; y < GRID_SIZE.height; y++) {
    for (let x = 0; x < GRID_SIZE.width; x++) {
      pixelData[y][x] = state[y][x];
    }
  }

  // 복원된 데이터로 캔버스 다시 그리기
  render();
};

/**
 * 이전 상태로 되돌립니다 (Undo)
 *
 * 히스토리에서 한 단계 뒤로 이동합니다.
 *
 * @example
 * // 히스토리: [A, B, C], historyStep = 2 (C 상태)
 * undo(); // historyStep = 1, B 상태로 돌아감
 * undo(); // historyStep = 0, A 상태로 돌아감
 * undo(); // historyStep = 0, 더 이상 되돌릴 수 없음
 */
export const undo = () => {
  // 되돌릴 히스토리가 있는지 확인
  if (historyStep > 0) {
    historyStep--;
    loadState(history[historyStep]);
  }
};

/**
 * 다음 상태로 이동합니다 (Redo)
 *
 * Undo로 되돌린 작업을 다시 실행합니다.
 *
 * @example
 * // 히스토리: [A, B, C], historyStep = 0 (A 상태, Undo 2번 후)
 * redo(); // historyStep = 1, B 상태로 이동
 * redo(); // historyStep = 2, C 상태로 이동
 * redo(); // historyStep = 2, 더 이상 다시 실행할 것 없음
 */
export const redo = () => {
  // 다시 실행할 히스토리가 있는지 확인
  if (historyStep < history.length - 1) {
    historyStep++;
    loadState(history[historyStep]);
  }
};

/**
 * 키보드 단축키 이벤트를 초기화합니다
 *
 * jQuery 키보드 이벤트:
 * - $(document).on('keydown', handler): 문서 전체에서 키 입력 감지
 * - e.ctrlKey: Ctrl 키가 눌렸는지 확인
 * - e.key: 눌린 키 이름 (예: 'z', 'y')
 * - e.preventDefault(): 브라우저 기본 동작 방지
 *
 * 단축키:
 * - Ctrl+Z: Undo (되돌리기)
 * - Ctrl+Y: Redo (다시하기)
 */
export const initHistoryEvents = () => {
  // $(document): 문서 전체를 jQuery 객체로 선택
  // .on('keydown', handler): 키보드 눌림 이벤트 등록
  $(document).on("keydown", (e) => {
    // Ctrl+Z: 되돌리기
    if (e.ctrlKey && e.key === "z") {
      e.preventDefault(); // 브라우저 기본 동작 방지
      undo();
    }

    // Ctrl+Y: 다시하기
    if (e.ctrlKey && e.key === "y") {
      e.preventDefault();
      redo();
    }
  });
};
