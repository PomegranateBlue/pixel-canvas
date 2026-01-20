// 컬러 시스템
const colorSystem = {
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
  maxRecent: 8,
};

// UI 생성
const createPaletteUI = () => {
  const paletteContainer = document.createElement("div");
  paletteContainer.id = "paletteContainer";

  // 기본 팔레트 섹션
  const defaultSection = document.createElement("div");
  defaultSection.className = "palette-section";
  defaultSection.innerHTML = '<h3>기본 팔레트</h3>';

  const defaultPaletteGrid = document.createElement("div");
  defaultPaletteGrid.className = "palette-grid";
  defaultPaletteGrid.id = "defaultPalette";

  defaultSection.appendChild(defaultPaletteGrid);

  // 최근 사용 색상 섹션
  const recentSection = document.createElement("div");
  recentSection.className = "palette-section";
  recentSection.innerHTML = '<h3>최근 사용</h3>';

  const recentPaletteGrid = document.createElement("div");
  recentPaletteGrid.className = "palette-grid";
  recentPaletteGrid.id = "recentPalette";

  recentSection.appendChild(recentPaletteGrid);

  // 커스텀 색상 추가 섹션
  const customSection = document.createElement("div");
  customSection.className = "palette-section";
  customSection.innerHTML = '<h3>색상 선택기</h3>';

  const colorPickerContainer = document.createElement("div");
  colorPickerContainer.className = "color-picker-container";

  const colorPicker = document.createElement("input");
  colorPicker.type = "color";
  colorPicker.id = "colorPicker";
  colorPicker.value = currentColor;

  const addColorButton = document.createElement("button");
  addColorButton.textContent = "팔레트에 추가";
  addColorButton.id = "addColorButton";

  const currentColorDisplay = document.createElement("div");
  currentColorDisplay.className = "current-color-display";
  currentColorDisplay.innerHTML = `<span>현재 색상:</span><div class="color-preview" id="currentColorPreview"></div><span id="currentColorHex">${currentColor}</span>`;

  colorPickerContainer.appendChild(colorPicker);
  colorPickerContainer.appendChild(addColorButton);
  colorPickerContainer.appendChild(currentColorDisplay);

  customSection.appendChild(colorPickerContainer);

  // 커스텀 팔레트 그리드
  const customPaletteGrid = document.createElement("div");
  customPaletteGrid.className = "palette-grid";
  customPaletteGrid.id = "customPalette";

  customSection.appendChild(customPaletteGrid);

  // 모두 추가
  paletteContainer.appendChild(defaultSection);
  paletteContainer.appendChild(recentSection);
  paletteContainer.appendChild(customSection);

  document.body.appendChild(paletteContainer);
};

// 팔레트 색상 버튼 생성
const createColorButton = (color) => {
  const button = document.createElement("button");
  button.className = "color-button";
  button.style.backgroundColor = color;
  button.title = color;

  // 현재 선택된 색상 표시
  if (color === currentColor) {
    button.classList.add("selected");
  }

  button.addEventListener("click", () => {
    currentColor = color;
    updateCurrentColorDisplay();
    addToRecentColors(color);
    updateSelectedButton();
  });

  return button;
};

// 기본 팔레트 렌더링
const renderDefaultPalette = () => {
  const container = document.getElementById("defaultPalette");
  container.innerHTML = "";

  colorSystem.defaultPalette.forEach((color) => {
    container.appendChild(createColorButton(color));
  });
};

// 최근 사용 색상 렌더링
const renderRecentPalette = () => {
  const container = document.getElementById("recentPalette");
  container.innerHTML = "";

  if (colorSystem.recentColors.length === 0) {
    container.innerHTML = '<p class="empty-message">사용한 색상이 없습니다</p>';
    return;
  }

  colorSystem.recentColors.forEach((color) => {
    container.appendChild(createColorButton(color));
  });
};

// 커스텀 팔레트 렌더링
const renderCustomPalette = () => {
  const container = document.getElementById("customPalette");
  container.innerHTML = "";

  if (colorSystem.customColors.length === 0) {
    return;
  }

  colorSystem.customColors.forEach((color, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "color-button-wrapper";

    const button = createColorButton(color);

    const removeButton = document.createElement("button");
    removeButton.className = "remove-color-button";
    removeButton.textContent = "×";
    removeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      removeCustomColor(index);
    });

    wrapper.appendChild(button);
    wrapper.appendChild(removeButton);
    container.appendChild(wrapper);
  });
};

// 최근 사용 색상에 추가
const addToRecentColors = (color) => {
  // 이미 있으면 제거
  const index = colorSystem.recentColors.indexOf(color);
  if (index > -1) {
    colorSystem.recentColors.splice(index, 1);
  }

  // 맨 앞에 추가
  colorSystem.recentColors.unshift(color);

  // 최대 개수 제한
  if (colorSystem.recentColors.length > colorSystem.maxRecent) {
    colorSystem.recentColors.pop();
  }

  renderRecentPalette();
};

// 커스텀 팔레트에 색상 추가
const addToCustomPalette = () => {
  const color = document.getElementById("colorPicker").value;

  // 이미 존재하는지 확인
  if (
    colorSystem.customColors.includes(color) ||
    colorSystem.defaultPalette.includes(color.toUpperCase())
  ) {
    alert("이미 팔레트에 있는 색상입니다.");
    return;
  }

  colorSystem.customColors.push(color);
  currentColor = color;
  updateCurrentColorDisplay();
  addToRecentColors(color);
  renderCustomPalette();
  updateSelectedButton();
};

// 커스텀 색상 제거
const removeCustomColor = (index) => {
  colorSystem.customColors.splice(index, 1);
  renderCustomPalette();
};

// 현재 색상 표시 업데이트
const updateCurrentColorDisplay = () => {
  const preview = document.getElementById("currentColorPreview");
  const hex = document.getElementById("currentColorHex");
  const picker = document.getElementById("colorPicker");

  if (preview) preview.style.backgroundColor = currentColor;
  if (hex) hex.textContent = currentColor;
  if (picker) picker.value = currentColor;
};

// 선택된 버튼 스타일 업데이트
const updateSelectedButton = () => {
  document.querySelectorAll(".color-button").forEach((btn) => {
    btn.classList.remove("selected");
    if (btn.style.backgroundColor === currentColor || btn.title === currentColor) {
      btn.classList.add("selected");
    }
  });
};

// 색상 선택기 이벤트
const initColorPickerEvents = () => {
  const colorPicker = document.getElementById("colorPicker");
  const addButton = document.getElementById("addColorButton");

  colorPicker.addEventListener("input", (e) => {
    currentColor = e.target.value;
    updateCurrentColorDisplay();
    updateSelectedButton();
  });

  addButton.addEventListener("click", addToCustomPalette);
};

// 초기화
const initPalette = () => {
  createPaletteUI();
  renderDefaultPalette();
  renderRecentPalette();
  renderCustomPalette();
  updateCurrentColorDisplay();
  initColorPickerEvents();
};

// DOM 로드 후 실행
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPalette);
} else {
  initPalette();
}
