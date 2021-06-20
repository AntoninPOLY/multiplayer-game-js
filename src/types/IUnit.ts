import { Schema } from '@colyseus/schema'


export interface IUnit extends Schema
{
    id: number
    attackDommage: number
    defense: number
    playerId: number
    cellId: number
    cost: number
    alive: boolean
}

export default IUnit
