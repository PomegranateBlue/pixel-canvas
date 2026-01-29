import * as THREE from "three/webgpu";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { pixelationPass } from "three/addons/tsl/display/PixelationPassNode.js";
import { createSphere } from "./objects/sphere.js";
import { initKeypad, moveSphere } from "./animate/keypad.js";

import generateFloor from "./objects/floor.js";
import { addHelpers, addCameraDebugGUI } from "./debug/helper.js";
import { shouldRender } from "./animate/clock.js";
import { updateJump } from "./animate/jump.js";

// Scene, Camera 생성
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a2e);

const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  100,
);
camera.position.set(4.9, 5.5, 9.4);
//현재 씬에서 고정시킬 카메라 좌표

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

generateFloor(scene);

// 디버그 헬퍼
addHelpers(scene);
addCameraDebugGUI(camera);

// 구 생성 (체스판 위에 배치)
const sphere = createSphere();
scene.add(sphere);

// 키패드 이벤트 등록
initKeypad();

// 픽셀화 후처리 (숫자가 클수록 픽셀이 커짐)
const postProcessing = new THREE.PostProcessing(renderer);
postProcessing.outputNode = pixelationPass(scene, camera, 3);

const init = async () => {
  await renderer.init();

  const animate = (currentTime) => {
    requestAnimationFrame(animate);

    if (!shouldRender(currentTime)) {
      return;
    }

    controls.update();
    moveSphere(sphere);
    updateJump(sphere);
    postProcessing.render();
  };
  animate(0);
};

init();

// 리사이즈 대응
addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
