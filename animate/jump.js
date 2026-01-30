// 점프 상태
let velocityY = 0
let isJumping = false

// 점프 설정
const gravity = 0.02
const jumpPower = 0.2
const groundY = 0.5

// 점프 시작
export const startJump = () => {
    if (!isJumping) {
        velocityY = jumpPower
        isJumping = true
    }
}

// 점프 업데이트 (animate에서 호출)
export const updateJump = (sphere) => {
    velocityY -= gravity
    sphere.position.y += velocityY

    if (sphere.position.y <= groundY) {
        sphere.position.y = groundY
        velocityY = 0
        isJumping = false
    }
}
