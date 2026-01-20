/**
 * 프로젝트 전역 상수 설정
 *
 * 이 파일은 애플리케이션 전체에서 사용되는 설정값들을 관리합니다.
 * 중앙화된 설정으로 유지보수가 쉬워집니다.
 */

// ===== 캔버스 설정 =====
export const CANVAS_CONFIG = {
  // 캔버스의 너비 (픽셀)
  width: 640,

  // 캔버스의 높이 (픽셀)
  height: 640,

  // 각 픽셀의 크기 (20px x 20px)
  // 이 값이 작을수록 더 세밀한 그림을 그릴 수 있습니다
  pixelSize: 20,
};

// 그리드 크기 계산
// 예: 640 / 20 = 32 (가로 32칸, 세로 32칸)
export const GRID_SIZE = {
  width: CANVAS_CONFIG.width / CANVAS_CONFIG.pixelSize,
  height: CANVAS_CONFIG.height / CANVAS_CONFIG.pixelSize,
};

// ===== 색상 팔레트 설정 =====
export const PALETTE_CONFIG = {
  // 기본 제공 색상 (16색)
  defaultColors: [
    "#000000", // 검정
    "#FFFFFF", // 흰색
    "#FF0000", // 빨강
    "#00FF00", // 초록
    "#0000FF", // 파랑
    "#FFFF00", // 노랑
    "#FF00FF", // 마젠타
    "#00FFFF", // 시안
    "#C0C0C0", // 은색
    "#808080", // 회색
    "#800000", // 적갈색
    "#808000", // 올리브
    "#008000", // 진한 초록
    "#800080", // 보라
    "#008080", // 청록
    "#000080", // 남색
  ],

  // 최근 사용 색상 최대 개수
  maxRecentColors: 8,

  // 기본 선택 색상
  defaultColor: "#000000",
};

// ===== 그리드 스타일 설정 =====
export const GRID_STYLE = {
  // 그리드 선 색상
  strokeColor: "#ddd",

  // 그리드 선 두께
  lineWidth: 0.5,
};

// ===== 도구 타입 =====
export const TOOLS = {
  PENCIL: "pencil",   // 연필 (그리기)
  ERASER: "eraser",   // 지우개
};
