import { RapierPhysics } from 'three/addons/physics/RapierPhysics.js'

let rapierPhysics = null

export const initRapierPhysics = async () => {
    rapierPhysics = new RapierPhysics()
    return rapierPhysics
}

export const getPhysics = () => rapierPhysics

export const updatePhysics = () => {
    if (rapierPhyscis) rapierPhysics
}
