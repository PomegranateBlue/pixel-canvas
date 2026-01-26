// 키 상태 저장
const keys = {
  up: false,
  down: false,
  left: false,
  right: false,
};

// 이동 속도
const speed = 0.06;

// 키보드 이벤트 등록
export const initKeypad = () => {
  addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") keys.up = true;
    if (e.key === "ArrowDown") keys.down = true;
    if (e.key === "ArrowLeft") keys.left = true;
    if (e.key === "ArrowRight") keys.right = true;
  });

  addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") keys.up = false;
    if (e.key === "ArrowDown") keys.down = false;
    if (e.key === "ArrowLeft") keys.left = false;
    if (e.key === "ArrowRight") keys.right = false;
  });
};

// 구 이동 (animate 루프에서 호출)
export const moveSphere = (sphere) => {
  if (keys.up) sphere.position.z -= speed;
  if (keys.down) sphere.position.z += speed;
  if (keys.left) sphere.position.x -= speed;
  if (keys.right) sphere.position.x += speed;
};
