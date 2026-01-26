// FPS 제한
const targetFPS = 45;
const interval = 1000 / targetFPS;
let lastTime = 0;

export const shouldRender = (currentTime) => {
  if (currentTime - lastTime < interval) return false;
  lastTime = currentTime;
  return true;
};
