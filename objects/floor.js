import * as THREE from "three/webgpu";

const generateFloor = (scene) => {
  const boardSize = 12;
  const tileSize = 1;
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee });
  const blackMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const tileGeo = new THREE.BoxGeometry(tileSize, 0.2, tileSize);

  for (let x = 0; x < boardSize; x++) {
    for (let z = 0; z < boardSize; z++) {
      const isWhite = (x + z) % 2 === 0;
      const tile = new THREE.Mesh(tileGeo, isWhite ? whiteMat : blackMat);
      tile.position.set(
        x * tileSize - (boardSize * tileSize) / 2 + tileSize / 2,
        0,
        z * tileSize - (boardSize * tileSize) / 2 + tileSize / 2,
      );
      scene.add(tile);
    }
  }
};

export default generateFloor;
