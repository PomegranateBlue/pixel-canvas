import * as THREE from 'three'

let camera = null
let controls = null
let sphere = null

// 구 기준 카메라 오프셋 (위에서 뒤쪽으로)
const OFFSET = new THREE.Vector3(0, 5, 8)

export const initViewControl = (activeCamera, activeControls) => {
    camera = activeCamera
    controls = activeControls
    controls.enabled = false // 기본적으로 추적 모드로 시작
}

export const setViewTarget = (trackingSphere) => {
    sphere = trackingSphere
}

export const updateViewControl = () => {
    if (!camera || !controls || !sphere) return

    // 구의 현재 위치 기준으로 목표 카메라 위치 계산
    const targetPos = sphere.position.clone().add(OFFSET)

    camera.position.lerp(targetPos, 0.05)
    controls.target.lerp(sphere.position, 0.05)
}
