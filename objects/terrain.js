import * as THREE from 'three/webgpu'

const createBox = (w, h, d, color) => {
    return new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({ color })
    )
}

export const createTerrain = (scene) => {
    const items = [] // { mesh, halfExtents } 배열 — 물리 등록에 사용

    const register = (mesh, halfExtents) => {
        scene.add(mesh)
        items.push({ mesh, halfExtents })
    }

    // ─── 계단 (4 steps) ─────────────────────────────────────────
    // 바닥 표면 y=0.1, step 높이 0.3m
    // center_y = 0.25 + i * 0.3 (step 1~4 순서)
    for (let i = 0; i < 4; i++) {
        const step = createBox(2, 0.3, 1, 0x8b7355)
        step.position.set(0, 0.25 + i * 0.3, 7 + i)
        register(step, [1, 0.15, 0.5])
    }
    // 4번째 계단 꼭대기: y=1.3, z=10~10.5

    // ─── 낮은 플랫폼 (계단 바로 연결) ───────────────────────────
    // 계단 top(y=1.3)과 높이를 맞춤
    const lowPlatform = createBox(4, 0.3, 2, 0x4a6fa5)
    lowPlatform.position.set(0, 1.15, 11.5) // top y=1.3, z=10.5~12.5
    register(lowPlatform, [2, 0.15, 1])

    // ─── 높은 플랫폼 (점프 구간) ─────────────────────────────────
    // 갭: z=12.5~14 (1.5m), 높이 차이: 1.0m
    const highPlatform = createBox(4, 0.3, 2, 0x2c4a7c)
    highPlatform.position.set(0, 2.15, 15) // top y=2.3, z=14~16
    register(highPlatform, [2, 0.15, 1])

    // ─── 미로 벽 ─────────────────────────────────────────────────
    // 체스판 위(z=-5~0 구간), 벽 높이 1.5m
    // 벽 center_y = 바닥 top(0.1) + 벽 절반 높이(0.75) = 0.85
    const WALL_COLOR = 0xd4a373
    const wallH = 1.5
    const cy = 0.85 // 벽 center y

    // 수직벽 A: x=-2, z=-3~1 (길이 4)
    const wallA = createBox(0.3, wallH, 4, WALL_COLOR)
    wallA.position.set(-2, cy, -1)
    register(wallA, [0.15, wallH / 2, 2])

    // 수직벽 B: x=2, z=-5~-1 (길이 4)
    const wallB = createBox(0.3, wallH, 4, WALL_COLOR)
    wallB.position.set(2, cy, -3)
    register(wallB, [0.15, wallH / 2, 2])

    // 수평벽 C: z=-5, x=-2~2 (길이 4)
    const wallC = createBox(4, wallH, 0.3, WALL_COLOR)
    wallC.position.set(0, cy, -5)
    register(wallC, [2, wallH / 2, 0.15])

    // 수평벽 D: z=-3, x=-5~-2 (길이 3)
    const wallD = createBox(3, wallH, 0.3, WALL_COLOR)
    wallD.position.set(-3.5, cy, -3)
    register(wallD, [1.5, wallH / 2, 0.15])

    return items
}
