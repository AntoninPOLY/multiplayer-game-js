import { Schema } from '@colyseus/schema'

export interface ICell extends Schema
{
    id: number
    q: number
    r: number
    s: number
    playerId: number
}

export default ICell
