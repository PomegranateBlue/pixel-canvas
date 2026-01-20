import Alpine from "alpinejs";

// Canvas 관련 코드 (기존 app.js 내용)
const canvas = document.getElementById("pixelCanvas");
const canvasContext = canvas.getContext("2d");

canvasContext.imageSmoothingEnabled = false;

// 픽셀 설정
const pixelSize = 20;
const gridWidth = canvas.width / pixelSize;
const gridHeight = canvas.height / pixelSize;

// 픽셀 데이터를 2D 배열로 관리
const pixelData = Array(gridHeight)
  .fill(null)
  .map(() => Array(gridWidth).fill(null));

// 히스토리 관리 (Undo/Redo)
const history = [];
let historyStep = -1;

// 현재 도구 및 색상
let isDrawing = false;
let currentColor = "#000000";
let currentTool = "pencil";

// 픽셀 설정
const setPixel = (x, y, color) => {
  if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
    pixelData[y][x] = color;
  }
};

// 히스토리 저장
const saveState = () => {
  historyStep++;
  history.length = historyStep;
  history.push(JSON.parse(JSON.stringify(pixelData)));
};

// 되돌리기
const undo = () => {
  if (historyStep > 0) {
    historyStep--;
    loadState(history[historyStep]);
  }
};

// 다시하기
const redo = () => {
  if (historyStep < history.length - 1) {
    historyStep++;
    loadState(history[historyStep]);
  }
};

// 상태 불러오기
const loadState = (state) => {
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      pixelData[y][x] = state[y][x];
    }
  }
  render();
};

// 그리드 그리기
const drawGrid = () => {
  canvasContext.strokeStyle = "#ddd";
  canvasContext.lineWidth = 0.5;

  for (let x = 0; x <= gridWidth; x++) {
    canvasContext.beginPath();
    canvasContext.moveTo(x * pixelSize, 0);
    canvasContext.lineTo(x * pixelSize, canvas.height);
    canvasContext.stroke();
  }

  for (let y = 0; y <= gridHeight; y++) {
    canvasContext.beginPath();
    canvasContext.moveTo(0, y * pixelSize);
    canvasContext.lineTo(canvas.width, y * pixelSize);
    canvasContext.stroke();
  }
};

// 전체 렌더링
const render = () => {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  // 픽셀 그리기
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      if (pixelData[y][x]) {
        canvasContext.fillStyle = pixelData[y][x];
        canvasContext.fillRect(
          x * pixelSize,
          y * pixelSize,
          pixelSize,
          pixelSize
        );
      }
    }
  }

  // 그리드 그리기
  drawGrid();
};

// 도구 시스템
const tools = {
  pencil: (x, y) => setPixel(x, y, currentColor),
  eraser: (x, y) => setPixel(x, y, null),
};

// 그리기 함수
const draw = (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / pixelSize);
  const y = Math.floor((e.clientY - rect.top) / pixelSize);

  if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
    tools[currentTool](x, y);
    render();
  }
};

// 마우스 이벤트
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  saveState();
  draw(e);
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) draw(e);
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvas.addEventListener("mouseleave", () => {
  isDrawing = false;
});

// 키보드 이벤트 (Undo/Redo)
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "z") {
    e.preventDefault();
    undo();
  }
  if (e.ctrlKey && e.key === "y") {
    e.preventDefault();
    redo();
  }
});

// Alpine.js 팔레트 데이터
window.paletteData = () => ({
  defaultPalette: [
    "#000000",
    "#FFFFFF",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#C0C0C0",
    "#808080",
    "#800000",
    "#808000",
    "#008000",
    "#800080",
    "#008080",
    "#000080",
  ],
  customColors: [],
  recentColors: [],
  currentColor: "#000000",
  maxRecent: 8,

  selectColor(color) {
    this.currentColor = color;
    currentColor = color; // 전역 변수 업데이트
    this.addToRecentColors(color);
  },

  updateColor() {
    currentColor = this.currentColor; // 전역 변수 업데이트
  },

  addToRecentColors(color) {
    // 이미 있으면 제거
    const index = this.recentColors.indexOf(color);
    if (index > -1) {
      this.recentColors.splice(index, 1);
    }

    // 맨 앞에 추가
    this.recentColors.unshift(color);

    // 최대 개수 제한
    if (this.recentColors.length > this.maxRecent) {
      this.recentColors.pop();
    }
  },

  addCustomColor() {
    const color = this.currentColor;

    // 이미 존재하는지 확인
    if (
      this.customColors.includes(color) ||
      this.defaultPalette.includes(color.toUpperCase())
    ) {
      alert("이미 팔레트에 있는 색상입니다.");
      return;
    }

    this.customColors.push(color);
    this.addToRecentColors(color);
  },

  removeCustomColor(index) {
    this.customColors.splice(index, 1);
  },
});

// Alpine.js 시작
window.Alpine = Alpine;
Alpine.start();

// 초기 상태 저장 및 렌더링
saveState();
render();
