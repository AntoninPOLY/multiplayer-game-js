import {CollectionSchema, Schema, type} from '@colyseus/schema'
import IPlayer from "../types/IPlayer"
import Cell from "./Cell";
import Unit from "./Unit";

export class Player extends Schema implements IPlayer
{
    @type("number")
    id: number

    @type("string")
    color: string

    @type({ collection: Cell })
    territory: CollectionSchema<Cell>

    @type({ collection: Unit })
    units: CollectionSchema<Unit>

    @type("number")
    village_cell: number

    @type("number")
    gold = 0

    constructor(id: number, color: string, territory: CollectionSchema<Cell>, cell_id: number) {
        super();
        this.id = id
        this.color = color
        this.territory = territory
        this.units = new CollectionSchema<Unit>()
        this.village_cell = cell_id
    }
}

export default Player
