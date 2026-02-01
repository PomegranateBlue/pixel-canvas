import * as THREE from 'three/webgpu'

export const greenZone = (scene) => {
    const boardSize = 16
    const tileSize = 1
    const greenMat = new THREE.MeshStandardMaterial({ color: 0x2d5a27 })
    const darkGreenMat = new THREE.MeshStandardMaterial({ color: 0x1e3d1a })
    const tileGeo = new THREE.BoxGeometry(tileSize, 0.2, tileSize)

    // 체스보드 끝(Z=+6)부터 시작, greenZone 중심은 Z=+14
    const offsetZ = 14

    for (let x = 0; x < boardSize; x++) {
        for (let z = 0; z < boardSize; z++) {
            const isLight = (x + z) % 2 === 0
            const tile = new THREE.Mesh(tileGeo, isLight ? greenMat : darkGreenMat)
            tile.position.set(
                x * tileSize - (boardSize * tileSize) / 2 + tileSize / 2,
                0,
                z * tileSize - (boardSize * tileSize) / 2 + tileSize / 2 + offsetZ
            )
            scene.add(tile)
        }
    }
}