import IBoard from "../types/IBoard";
import {CollectionSchema, Schema, type} from "@colyseus/schema";
import Cell from "./Cell";
import Unit from "./Unit";

export default class Board extends Schema implements IBoard{
    @type("number")
    range = 0

    @type({ collection: Cell })
    cells: CollectionSchema<Cell>

    constructor(radius: number) {
        super();
        this.range = radius
        this.cells = new CollectionSchema<Cell>()
    }

    private selectBorder(size: number) {
        this.cells.forEach(cellState => {
            const x = cellState.q < 0 ? cellState.q * - 1 : cellState.q
            const z = cellState.r < 0 ? cellState.r * - 1 : cellState.r
            const y = cellState.s < 0 ? cellState.s * - 1 : cellState.s
            if (x == size || y == size || z == size)
                cellState.playerId = 0

        })

    }

    public getCellByCoord(q: number, r: number, s: number): Cell | void{
        this.cells.forEach(cell => {
            if (cell.isSame(q,r,s))
                return cell;
        })
    }

    getNeighborsCell(cell: Cell) {
        let numbers = [];
        let x = 0;
        Cell.directions.forEach(direction => {
            const buff = this.getCellByCoord(cell.q + direction.q, cell.r + direction.r, cell.s + direction.s)
            if (buff) {
                x = buff.id
                numbers.push(x)
            }
        })
        return numbers
    }

    createBoard() {
        let id = 0
        const mapRadius = this.range
        for (let q = -mapRadius; q <= mapRadius; q++) {
            const r1 = Math.max(-mapRadius, -q - mapRadius)
            const r2 = Math.min(mapRadius, -q + mapRadius)

            for (let r = r1; r <= r2; r++) {
                const cell = new Cell(q, r, -q - r)
                cell.setId(id)
                this.cells.add(cell)
                id++;
            }
        }
    }
}
