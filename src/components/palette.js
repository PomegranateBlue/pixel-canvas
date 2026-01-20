/**
 * Alpine.js 팔레트 컴포넌트
 *
 * 이 모듈은 색상 선택 UI를 Alpine.js로 관리합니다.
 * Alpine.js는 HTML에서 직접 상태와 동작을 선언할 수 있는
 * 경량 JavaScript 프레임워크입니다.
 */

import { PALETTE_CONFIG } from "../config/constants.js";
import { setCurrentColor } from "../canvas/drawingTools.js";

/**
 * Alpine.js 팔레트 데이터 함수
 *
 * 이 함수는 Alpine.js의 x-data 디렉티브에서 사용됩니다.
 * 반환되는 객체의 모든 속성과 메서드는
 * HTML 템플릿에서 바로 사용할 수 있습니다.
 *
 * Alpine.js 기본 개념:
 * - x-data: 컴포넌트의 상태(데이터)를 정의
 * - 반응성: 데이터가 변경되면 UI가 자동으로 업데이트됨
 * - this: 컴포넌트 내에서 자신의 데이터에 접근할 때 사용
 *
 * @returns {object} Alpine.js 컴포넌트 데이터
 */
export const createPaletteData = () => ({
  // ===== 반응형 상태 (Reactive State) =====
  // Alpine.js에서 이 값들이 변경되면 자동으로 UI가 업데이트됩니다

  /**
   * 기본 제공 색상 팔레트
   * @type {string[]}
   */
  defaultPalette: PALETTE_CONFIG.defaultColors,

  /**
   * 사용자가 추가한 커스텀 색상
   * @type {string[]}
   */
  customColors: [],

  /**
   * 최근 사용한 색상 (최대 8개)
   * @type {string[]}
   */
  recentColors: [],

  /**
   * 현재 선택된 색상
   * Alpine.js의 반응성 덕분에 이 값이 변경되면
   * HTML의 :style, x-text 등이 자동으로 업데이트됩니다
   * @type {string}
   */
  currentColor: PALETTE_CONFIG.defaultColor,

  /**
   * 최근 사용 색상 최대 개수
   * @type {number}
   */
  maxRecent: PALETTE_CONFIG.maxRecentColors,

  // ===== 메서드 (Methods) =====
  // HTML에서 @click="selectColor(color)" 형태로 호출됩니다

  /**
   * 색상을 선택합니다
   *
   * Alpine.js 사용법:
   * HTML에서 @click="selectColor('#FF0000')" 형태로 호출
   *
   * @param {string} color - 선택할 색상
   *
   * @example
   * // HTML에서:
   * <button @click="selectColor('#FF0000')">Red</button>
   */
  selectColor(color) {
    // Alpine.js 내부 상태 업데이트
    // this는 이 컴포넌트 객체를 가리킵니다
    this.currentColor = color;

    // 캔버스 그리기 모듈에도 색상 전달
    setCurrentColor(color);

    // 최근 사용 색상에 추가
    this.addToRecentColors(color);
  },

  /**
   * 색상 선택기(input[type="color"])에서 색상이 변경될 때 호출
   *
   * Alpine.js의 x-model 디렉티브:
   * x-model="currentColor"는 양방향 바인딩을 제공합니다
   * - input 값이 변경되면 currentColor도 변경
   * - currentColor가 변경되면 input 값도 변경
   *
   * @example
   * // HTML에서:
   * <input type="color" x-model="currentColor" @input="updateColor">
   */
  updateColor() {
    // x-model로 이미 currentColor는 업데이트되었으므로
    // 캔버스 모듈에만 전달하면 됩니다
    setCurrentColor(this.currentColor);
  },

  /**
   * 최근 사용 색상 목록에 추가합니다
   *
   * 작동 방식:
   * 1. 이미 있는 색상이면 목록에서 제거
   * 2. 맨 앞에 추가 (최신 항목이 맨 앞)
   * 3. 최대 개수 초과 시 마지막 항목 제거
   *
   * @param {string} color - 추가할 색상
   */
  addToRecentColors(color) {
    // 1. 이미 있는 색상이면 제거 (중복 방지)
    const index = this.recentColors.indexOf(color);
    if (index > -1) {
      this.recentColors.splice(index, 1);
    }

    // 2. 맨 앞에 추가 (최신 항목)
    this.recentColors.unshift(color);

    // 3. 최대 개수 제한
    if (this.recentColors.length > this.maxRecent) {
      this.recentColors.pop(); // 마지막 항목 제거
    }
  },

  /**
   * 현재 색상을 커스텀 팔레트에 추가합니다
   *
   * @example
   * // HTML에서:
   * <button @click="addCustomColor">팔레트에 추가</button>
   */
  addCustomColor() {
    const color = this.currentColor;

    // 중복 확인: 이미 기본 팔레트나 커스텀 팔레트에 있으면 경고
    if (
      this.customColors.includes(color) ||
      this.defaultPalette.includes(color.toUpperCase())
    ) {
      alert("이미 팔레트에 있는 색상입니다.");
      return;
    }

    // 커스텀 팔레트에 추가
    // Alpine.js가 배열 변경을 감지하여 자동으로 UI 업데이트
    this.customColors.push(color);

    // 최근 사용 색상에도 추가
    this.addToRecentColors(color);
  },

  /**
   * 커스텀 팔레트에서 색상을 제거합니다
   *
   * @param {number} index - 제거할 색상의 인덱스
   *
   * @example
   * // HTML에서:
   * <button @click="removeCustomColor(0)">×</button>
   */
  removeCustomColor(index) {
    // 배열에서 해당 인덱스의 항목 제거
    // Alpine.js가 자동으로 UI 업데이트
    this.customColors.splice(index, 1);
  },
});

/**
 * Alpine.js 디렉티브 사용 예시:
 *
 * 1. x-data: 컴포넌트 데이터 정의
 *    <div x-data="paletteData()">
 *
 * 2. x-for: 배열 순회 (v-for와 비슷)
 *    <template x-for="color in defaultPalette">
 *
 * 3. @click: 클릭 이벤트 (@는 x-on:의 단축)
 *    <button @click="selectColor(color)">
 *
 * 4. :style: 동적 스타일 바인딩 (:는 x-bind:의 단축)
 *    <div :style="`background: ${color}`">
 *
 * 5. x-text: 텍스트 내용 설정
 *    <span x-text="currentColor"></span>
 *
 * 6. x-show: 조건부 표시 (CSS display 토글)
 *    <div x-show="customColors.length > 0">
 *
 * 7. x-if: 조건부 렌더링 (DOM에서 완전히 추가/제거)
 *    <template x-if="recentColors.length === 0">
 *
 * 8. x-model: 양방향 바인딩
 *    <input x-model="currentColor">
 *
 * 9. :class: 동적 클래스 바인딩
 *    <div :class="{ selected: currentColor === color }">
 */
