import {CollectionSchema, Schema} from '@colyseus/schema'
import Cell from "../server/Cell";
import Unit from "../server/Unit";

export interface IPlayer extends Schema
{
    id: number
    gold: number
    color: string
    territory: CollectionSchema<Cell>;
    units: CollectionSchema<Unit>;
    village_cell: number

}

export default IPlayer
