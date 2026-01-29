import * as THREE from "three/webgpu";
import GUI from "lil-gui";

// 디버그 헬퍼 추가
export const addHelpers = (scene) => {
  // 좌표축: X(빨강), Y(초록), Z(파랑)
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // 그리드: 크기 12, 칸 12개
  const gridHelper = new THREE.GridHelper(16, 16, 0x888888, 0x444444);
  gridHelper.position.y = 0.11; // 바닥 위에 살짝 띄움
  scene.add(gridHelper);
};

// 카메라 디버그 GUI 추가
export const addCameraDebugGUI = (camera) => {
  const gui = new GUI({ title: "Camera Debug" });

  const cameraFolder = gui.addFolder("Position");
  cameraFolder.add(camera.position, "x", -50, 50, 0.1).name("X").listen();
  cameraFolder.add(camera.position, "y", -50, 50, 0.1).name("Y").listen();
  cameraFolder.add(camera.position, "z", -50, 50, 0.1).name("Z").listen();

  const rotationFolder = gui.addFolder("Rotation (deg)");
  const rotationProxy = {
    get x() {
      return THREE.MathUtils.radToDeg(camera.rotation.x);
    },
    set x(v) {
      camera.rotation.x = THREE.MathUtils.degToRad(v);
    },
    get y() {
      return THREE.MathUtils.radToDeg(camera.rotation.y);
    },
    set y(v) {
      camera.rotation.y = THREE.MathUtils.degToRad(v);
    },
    get z() {
      return THREE.MathUtils.radToDeg(camera.rotation.z);
    },
    set z(v) {
      camera.rotation.z = THREE.MathUtils.degToRad(v);
    },
  };
  rotationFolder.add(rotationProxy, "x", -180, 180, 1).name("X").listen();
  rotationFolder.add(rotationProxy, "y", -180, 180, 1).name("Y").listen();
  rotationFolder.add(rotationProxy, "z", -180, 180, 1).name("Z").listen();

  const fovFolder = gui.addFolder("Perspective");
  fovFolder
    .add(camera, "fov", 10, 120, 1)
    .name("FOV")
    .onChange(() => camera.updateProjectionMatrix());

  gui
    .add(
      {
        reset: () => {
          camera.position.set(6, 6, 6);
          camera.rotation.set(0, 0, 0);
          camera.fov = 75;
          camera.updateProjectionMatrix();
        },
      },
      "reset",
    )
    .name("Reset Camera");

  return gui;
};
