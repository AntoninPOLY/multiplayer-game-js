import {CollectionSchema, Schema} from '@colyseus/schema'
import Cell from "../server/Cell";

export interface IBoard extends Schema
{
    range: number
    cells: CollectionSchema<Cell>
}

export default IBoard
