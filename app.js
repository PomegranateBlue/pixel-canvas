import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// ===== 기본 설정 =====
const CONFIG = {
  // 복셀 그리드 크기
  gridSize: 16,
  // 복셀 하나의 크기
  voxelSize: 1,
  // 배경색
  backgroundColor: 0x1a1a2e,
};

// ===== Three.js 기본 요소 =====

// 1. Scene (씬) - 3D 객체들이 존재하는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(CONFIG.backgroundColor);

// 2. Camera (카메라) - 씬을 바라보는 시점
// PerspectiveCamera: 원근감이 있는 카메라 (사람 눈처럼)
// 파라미터: (시야각, 종횡비, 가까운면, 먼면)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(15, 15, 15); // 카메라 위치
camera.lookAt(0, 0, 0); // 원점을 바라봄

// 3. Renderer (렌더러) - 씬을 화면에 그려주는 역할
const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true, // 부드러운 가장자리
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 4. OrbitControls - 마우스로 카메라 회전/줌
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 부드러운 움직임
controls.dampingFactor = 0.05;

// ===== 조명 설정 =====

// AmbientLight - 전체적으로 은은한 빛 (그림자 없음)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// DirectionalLight - 태양광처럼 한 방향에서 오는 빛
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

// ===== 바닥 그리드 =====
const gridHelper = new THREE.GridHelper(CONFIG.gridSize, CONFIG.gridSize);
scene.add(gridHelper);

// ===== 복셀 데이터 =====
// 3D 배열로 복셀 저장: voxels[x][y][z] = mesh 또는 null
const voxels = {};

// 복셀 추가 함수
const addVoxel = (x, y, z, color = 0x00ff00) => {
  const key = `${x},${y},${z}`;
  if (voxels[key]) return; // 이미 있으면 무시

  const geometry = new THREE.BoxGeometry(
    CONFIG.voxelSize,
    CONFIG.voxelSize,
    CONFIG.voxelSize
  );
  const material = new THREE.MeshLambertMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);

  // 복셀 위치 설정 (그리드 중앙 정렬)
  cube.position.set(
    x - CONFIG.gridSize / 2 + 0.5,
    y + 0.5,
    z - CONFIG.gridSize / 2 + 0.5
  );

  scene.add(cube);
  voxels[key] = cube;
};

// 복셀 제거 함수
const removeVoxel = (x, y, z) => {
  const key = `${x},${y},${z}`;
  if (voxels[key]) {
    scene.remove(voxels[key]);
    delete voxels[key];
  }
};

// ===== 샘플 복셀 배치 =====
// 바닥에 몇 개의 복셀 추가
for (let x = 6; x < 10; x++) {
  for (let z = 6; z < 10; z++) {
    addVoxel(x, 0, z, 0x4ecdc4);
  }
}
// 위에 몇 개 더 쌓기
addVoxel(7, 1, 7, 0xff6b6b);
addVoxel(8, 1, 7, 0xff6b6b);
addVoxel(7, 1, 8, 0xff6b6b);
addVoxel(8, 1, 8, 0xff6b6b);
addVoxel(7, 2, 7, 0xffd93d);

// ===== 애니메이션 루프 =====
const animate = () => {
  requestAnimationFrame(animate);
  controls.update(); // OrbitControls 업데이트
  renderer.render(scene, camera);
};

animate();

// ===== 윈도우 리사이즈 대응 =====
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
