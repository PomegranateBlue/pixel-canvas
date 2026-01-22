import * as Three from "three/webgpu";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { pixelationPass } from "three/addons/tsl/display/PixelationPassNode.js";

const orbitControls = new OrbitControls(Camera, renderer, domElement);

Camera.position.set(0, 0, 0);
orbitControls.update();

const OrbitControlsAnimation = () => {
  orbitControls.update();
  renderer.render(Scene, Camera);
};
