import RAPIER from '@dimforge/rapier3d-compat'
let world = null
const bodies = new Map() // mesh → body 매핑

export const initPhysics = async () => {
    await RAPIER.init()
    world = new RAPIER.World({ x: 0, y: -30.0, z: 0 })
    return world
}

export const addDynamicBody = (mesh, radius) => {
    const pos = mesh.position
    const body = world.createRigidBody(RAPIER.RigidBodyDesc.dynamic().setTranslation(pos.x, pos.y, pos.z))
    world.createCollider(RAPIER.ColliderDesc.ball(radius), body)
    bodies.set(mesh, body)
    return body
}

export const addStaticBody = (mesh, halfExtents) => {
    const pos = mesh.position
    const body = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(pos.x, pos.y, pos.z))
    world.createCollider(RAPIER.ColliderDesc.cuboid(...halfExtents), body)
    return body
}

export const stepPhysics = () => {
    world.step()

    // 모든 동적 물체 위치 동기화
    bodies.forEach((body, mesh) => {
        const pos = body.translation()
        mesh.position.set(pos.x, pos.y, pos.z)
    })
}

export const getBody = (mesh) => bodies.get(mesh)

export const addCollideFloor = () => {
    const body = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0))
    world.createCollider(RAPIER.ColliderDesc.cuboid(6, 0.1, 6), body)
    return body
}
