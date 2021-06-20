import {Schema, type} from "@colyseus/schema";
import IUnit from "../types/IUnit";

export default class Unit extends Schema implements IUnit{
    private static count = 0

    @type("number")
    id: number

    @type("number")
    attackDommage = 1

    @type("number")
    defense = 0

    @type("number")
    playerId = 0

    @type("number")
    cellId = 0

    @type("number")
    cost = 0

    @type("boolean")
    alive = false

    get ad() {
        return this.attackDommage
    }

    get res() {
        return this.defense
    }

    constructor() {
        super()
        this.id  = Unit.count++
        this.alive = true
    }

    attack(unit: Unit): boolean {
        if(this.ad > unit.res) {
            unit.die()
            return true
        }
        return false
    }

    die() {
        this.alive = false
    }

}
