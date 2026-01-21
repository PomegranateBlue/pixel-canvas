/**
 * 애플리케이션 진입점 (Entry Point)
 *
 * 이 파일은 애플리케이션의 시작점입니다.
 * 모든 모듈을 가져와서 초기화하고 연결합니다.
 *
 * 파일 구조:
 * src/
 * ├── config/
 * │   └── constants.js         - 상수 설정
 * ├── canvas/
 * │   ├── pixelData.js         - 픽셀 데이터 관리
 * │   ├── renderer.js          - 캔버스 렌더링
 * │   └── drawingTools.js      - 그리기 도구
 * ├── history/
 * │   └── historyManager.js    - Undo/Redo
 * ├── components/
 * │   └── palette.js           - 색상 팔레트 UI
 * └── main.js                  - 진입점 (현재 파일)
 */

// ===== Alpine.js 임포트 =====
import Alpine from "alpinejs";

// ===== jQuery 임포트 =====
// jQuery 4: $ 함수로 DOM 선택 및 조작
// 사용법: $('#id'), $('.class'), $('tag')
import $ from "jquery";

// ===== 캔버스 관련 모듈 임포트 =====
import { render } from "./canvas/renderer.js";
import { initDrawingEvents } from "./canvas/drawingTools.js";

// ===== 히스토리 관련 모듈 임포트 =====
import { saveState, initHistoryEvents } from "./history/historyManager.js";

// ===== UI 컴포넌트 임포트 =====
import { createPaletteData } from "./components/palette.js";

/**
 * 애플리케이션 초기화
 *
 * 이 함수는 모든 모듈을 설정하고 연결합니다.
 * jQuery의 $(document).ready()를 사용하여 DOM 로드 후 실행됩니다.
 */
const initApp = () => {
  // 1. Alpine.js 팔레트 컴포넌트를 전역으로 등록
  // HTML에서 x-data="paletteData()"로 사용 가능
  window.paletteData = createPaletteData;

  // 2. Alpine.js를 전역 객체로 등록 (디버깅용)
  window.Alpine = Alpine;

  // 3. Alpine.js 시작
  // 이 시점부터 x-data, x-for 등의 디렉티브가 작동합니다
  Alpine.start();

  // 4. 캔버스 그리기 이벤트 초기화
  // 마우스 클릭, 드래그 등의 이벤트 리스너 등록
  initDrawingEvents();

  // 5. 히스토리 키보드 이벤트 초기화
  // Ctrl+Z (Undo), Ctrl+Y (Redo) 단축키 등록
  initHistoryEvents();

  // 6. 초기 상태를 히스토리에 저장
  // 빈 캔버스 상태를 저장하여 Undo로 돌아갈 수 있게 함
  saveState();

  // 7. 캔버스 첫 렌더링
  // 그리드를 그려서 사용자에게 보여줌
  render();
};

/**
 * jQuery의 $(document).ready() 사용
 *
 * jQuery 4에서는 $() 단축 문법 사용 가능:
 * - $(function() { }) === $(document).ready(function() { })
 * - DOM이 완전히 로드된 후 콜백 실행
 */
$(initApp);

/**
 * 개발자 도구 팁:
 *
 * 콘솔에서 다음 명령어를 실행해보세요:
 *
 * 1. Alpine.js 데이터 확인:
 *    Alpine.$data(document.querySelector('#paletteContainer'))
 *
 * 2. 현재 색상 확인:
 *    Alpine.$data(document.querySelector('#paletteContainer')).currentColor
 *
 * 3. 색상 변경:
 *    Alpine.$data(document.querySelector('#paletteContainer')).currentColor = '#FF0000'
 */
