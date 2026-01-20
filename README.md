# 픽셀 아트 에디터

Canvas와 Alpine.js를 사용한 픽셀 아트 에디터입니다.

## 프로젝트 구조

```
practice/
├── src/
│   ├── config/
│   │   └── constants.js         # 전역 상수 설정 (캔버스 크기, 색상 팔레트 등)
│   ├── canvas/
│   │   ├── pixelData.js         # 픽셀 데이터 관리 (2D 배열)
│   │   ├── renderer.js          # 캔버스 렌더링 (그리기, 그리드)
│   │   └── drawingTools.js      # 그리기 도구 (연필, 지우개, 마우스 이벤트)
│   ├── history/
│   │   └── historyManager.js    # Undo/Redo 기능
│   ├── components/
│   │   └── palette.js           # Alpine.js 색상 팔레트 컴포넌트
│   └── main.js                  # 애플리케이션 진입점
├── index.html                    # HTML 템플릿
├── style.css                     # 스타일시트
└── package.json                  # npm 설정
```

## 파일별 역할

### 📁 config/
- **constants.js**: 프로젝트 전역 설정값 관리

### 📁 canvas/
- **pixelData.js**: 픽셀 데이터를 2D 배열로 관리
- **renderer.js**: Canvas API를 사용하여 픽셀과 그리드 렌더링
- **drawingTools.js**: 마우스 이벤트 처리 및 그리기 로직

### 📁 history/
- **historyManager.js**: Undo/Redo 기능 (Ctrl+Z, Ctrl+Y)

### 📁 components/
- **palette.js**: Alpine.js를 사용한 색상 선택 UI 컴포넌트

### 📄 main.js
- 모든 모듈을 통합하고 초기화하는 진입점

## 기술 스택

- **Canvas API**: 픽셀 렌더링
- **Alpine.js**: 반응형 UI (색상 팔레트)
- **Vite**: 개발 서버 및 빌드 도구
- **ES6 Modules**: 모듈화된 코드 구조

## 실행 방법

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 주요 기능

- ✏️ 마우스 드래그로 픽셀 그리기
- 🎨 색상 팔레트 (기본 16색)
- 🎨 커스텀 색상 추가
- 📝 최근 사용 색상 자동 추적
- ↩️ Undo/Redo (Ctrl+Z / Ctrl+Y)
- 🧹 지우개 도구

## Alpine.js 주요 개념

### x-data
컴포넌트의 상태(데이터)를 정의합니다.
```html
<div x-data="paletteData()">
```

### x-for
배열을 순회하며 요소를 렌더링합니다.
```html
<template x-for="color in defaultPalette">
  <button :style="`background: ${color}`"></button>
</template>
```

### @click
클릭 이벤트를 처리합니다.
```html
<button @click="selectColor(color)">
```

### :style, :class
동적으로 스타일과 클래스를 바인딩합니다.
```html
<div :style="`background: ${color}`" :class="{ selected: isSelected }">
```

### x-model
양방향 데이터 바인딩을 제공합니다.
```html
<input type="color" x-model="currentColor">
```

## 코드 개선 포인트

1. **모듈화**: 기능별로 파일을 분리하여 관리 용이
2. **주석**: Alpine.js 초심자를 위한 자세한 설명 포함
3. **상수 관리**: 설정값을 한 곳에서 관리
4. **ES6 Modules**: import/export로 의존성 명확화
5. **단일 책임 원칙**: 각 모듈이 하나의 역할만 수행

## 개발자 도구 팁

콘솔에서 Alpine.js 데이터 확인:
```javascript
// 팔레트 데이터 확인
Alpine.$data(document.querySelector('#paletteContainer'))

// 현재 색상 확인
Alpine.$data(document.querySelector('#paletteContainer')).currentColor

// 색상 변경
Alpine.$data(document.querySelector('#paletteContainer')).currentColor = '#FF0000'
```
