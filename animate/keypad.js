import { getBody } from './physics/rapierphysics.js'

// 키 상태 저장
const keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false,
    isSpacePressed: false,
}

// 이동 속도
const speed = 3

// 키보드 이벤트 등록
export const initKeypad = () => {
    addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') keys.up = true
        if (e.key === 'ArrowDown') keys.down = true
        if (e.key === 'ArrowLeft') keys.left = true
        if (e.key === 'ArrowRight') keys.right = true
        if (e.key === ' ' && !keys.isSpacePressed) {
            keys.space = true
            keys.isSpacePressed = true
            jump()
        }
    })

    addEventListener('keyup', (e) => {
        if (e.key === 'ArrowUp') keys.up = false
        if (e.key === 'ArrowDown') keys.down = false
        if (e.key === 'ArrowLeft') keys.left = false
        if (e.key === 'ArrowRight') keys.right = false
        if (e.key === ' ') {
            keys.space = false
            keys.isSpacePressed = false
        }
    })
}

// sphere를 저장할 변수 (jump에서 사용)
let sphereRef = null

// 구 이동 (animate 루프에서 호출)
export const moveSphere = (sphere) => {
    sphereRef = sphere
    const body = getBody(sphere)
    if (!body) return

    const vel = body.linvel() // 현재 속도
    let vx = 0
    let vz = 0

    if (keys.up) vz = -speed
    if (keys.down) vz = speed
    if (keys.left) vx = -speed
    if (keys.right) vx = speed

    // y 속도는 유지 (점프/낙하)
    body.setLinvel({ x: vx, y: vel.y, z: vz }, true)
}

// 점프
const jump = () => {
    if (!sphereRef) return
    const body = getBody(sphereRef)
    if (!body) return

    const vel = body.linvel()
    // y 속도가 거의 0이면 바닥에 있다고 판단
    if (Math.abs(vel.y) < 0.5) {
        body.applyImpulse({ x: 0, y: 3.0, z: 0 }, true)
    }
}
