import * as THREE from "three/webgpu";

// 디버그 헬퍼 추가
export const addHelpers = (scene) => {
  // 좌표축: X(빨강), Y(초록), Z(파랑)
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // 그리드: 크기 12, 칸 12개
  const gridHelper = new THREE.GridHelper(12, 12, 0x888888, 0x444444);
  gridHelper.position.y = 0.11; // 바닥 위에 살짝 띄움
  scene.add(gridHelper);
};
