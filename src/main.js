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
 * DOMContentLoaded 이벤트에서 호출되어야 합니다.
 */
const initApp = () => {
  console.log("🎨 픽셀 아트 에디터 초기화 중...");

  // 1. Alpine.js 팔레트 컴포넌트를 전역으로 등록
  // HTML에서 x-data="paletteData()"로 사용 가능
  window.paletteData = createPaletteData;

  // 2. Alpine.js를 전역 객체로 등록 (디버깅용)
  window.Alpine = Alpine;

  // 3. Alpine.js 시작
  // 이 시점부터 x-data, x-for 등의 디렉티브가 작동합니다
  Alpine.start();
  console.log("✅ Alpine.js 시작됨");

  // 4. 캔버스 그리기 이벤트 초기화
  // 마우스 클릭, 드래그 등의 이벤트 리스너 등록
  initDrawingEvents();
  console.log("✅ 그리기 이벤트 초기화됨");

  // 5. 히스토리 키보드 이벤트 초기화
  // Ctrl+Z (Undo), Ctrl+Y (Redo) 단축키 등록
  initHistoryEvents();
  console.log("✅ 히스토리 이벤트 초기화됨");

  // 6. 초기 상태를 히스토리에 저장
  // 빈 캔버스 상태를 저장하여 Undo로 돌아갈 수 있게 함
  saveState();
  console.log("✅ 초기 상태 저장됨");

  // 7. 캔버스 첫 렌더링
  // 그리드를 그려서 사용자에게 보여줌
  render();
  console.log("✅ 캔버스 렌더링 완료");

  console.log("🎉 픽셀 아트 에디터 준비 완료!");
  console.log("📖 사용법:");
  console.log("  - 마우스 드래그: 그리기");
  console.log("  - Ctrl+Z: 되돌리기");
  console.log("  - Ctrl+Y: 다시하기");
};

/**
 * DOM이 로드되면 애플리케이션 초기화
 *
 * DOMContentLoaded 이벤트:
 * - HTML 파싱이 완료되고 DOM 트리가 만들어진 시점
 * - 이미지나 스타일시트 로딩 완료를 기다리지 않음
 * - 가장 빠른 시점에 JavaScript 실행 가능
 */
if (document.readyState === "loading") {
  // 아직 로딩 중이면 이벤트 등록
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  // 이미 로드 완료되었으면 바로 실행
  initApp();
}

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
