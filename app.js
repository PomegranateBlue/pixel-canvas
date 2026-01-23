import * as THREE from "three/webgpu";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { pixelationPass } from "three/addons/tsl/display/PixelationPassNode.js";

// Scene, Camera 생성
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);

const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  100,
);
camera.position.set(6, 6, 6);

// Renderer 생성
const renderer = new THREE.WebGPURenderer({ antialias: false });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// 조명
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// 체스판 생성
const boardSize = 8;
const tileSize = 1;
const whiteMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee });
const blackMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
const tileGeo = new THREE.BoxGeometry(tileSize, 0.2, tileSize);

for (let x = 0; x < boardSize; x++) {
  for (let z = 0; z < boardSize; z++) {
    const isWhite = (x + z) % 2 === 0;
    const tile = new THREE.Mesh(tileGeo, isWhite ? whiteMat : blackMat);
    tile.position.set(
      x * tileSize - (boardSize * tileSize) / 2 + tileSize / 2,
      0,
      z * tileSize - (boardSize * tileSize) / 2 + tileSize / 2,
    );
    scene.add(tile);
  }
}

// 구 생성 (체스판 위에 배치)
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.4, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0x00ff88 }),
);
sphere.position.set(0, 0.5, 0);
scene.add(sphere);

// 픽셀화 후처리 (숫자가 클수록 픽셀이 커짐)
const postProcessing = new THREE.PostProcessing(renderer);
postProcessing.outputNode = pixelationPass(scene, camera, 6);

// WebGPU 초기화 후 애니메이션 시작

// async function init() {
//   await renderer.init();

//   const animate = () => {
//     requestAnimationFrame(animate);
//     controls.update();
//     postProcessing.render();
//   };
//   animate();
// }

const init = async () => {
  await renderer.init();

  const animate = () => {
    requestAnimationFrame(animate);
    constrols.update();
    postProcessing.render();
  };
  animate();
};

init();
