import ICell from "../types/ICell";
import {Schema, type} from "@colyseus/schema";

export default class Cell extends Schema implements ICell{
    @type("number")
    q = 0

    @type("number")
    r = 0

    @type("number")
    s = 0

    @type("number")
    id = -1
    @type("number")
    playerId = -1

    constructor(q: number, r: number, s: number) {
        super()
        if(Math.round(q + r + s) !== 0) throw "q + r + s must be equal to 0"
        else {
            this.q = q
            this.r = r
            this.s = s
        }
    }

    setId(id: number) {
        this.id = id
    }

    isSame(q: number, r: number, s: number): boolean {
        return this.q === q && this.r === r && this.s === s
    }

    public round(): Cell
    {
        var qi:number = Math.round(this.q);
        var ri:number = Math.round(this.r);
        var si:number = Math.round(this.s);
        var q_diff:number = Math.abs(qi - this.q);
        var r_diff:number = Math.abs(ri - this.r);
        var s_diff:number = Math.abs(si - this.s);
        if (q_diff > r_diff && q_diff > s_diff)
        {
            qi = -ri - si;
        }
        else
        if (r_diff > s_diff)
        {
            ri = -qi - si;
        }
        else
        {
            si = -qi - ri;
        }
        return new Cell(qi, ri, si);
    }

    public static directions:Cell[] = [new Cell(1, 0, -1), new Cell(1, -1, 0), new Cell(0, -1, 1), new Cell(-1, 0, 1), new Cell(-1, 1, 0), new Cell(0, 1, -1)];


    public add(b:Cell):Cell
    {
        return new Cell(this.q + b.q, this.r + b.r, this.s + b.s);
    }

    public static direction(direction:number):Cell
    {
        return Cell.directions[direction];
    }


    public neighbor(direction:number):Cell
    {
        return this.add(Cell.direction(direction));
    }
}
