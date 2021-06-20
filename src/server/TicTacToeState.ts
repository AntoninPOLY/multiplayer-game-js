import {CollectionSchema, MapSchema, Schema, type} from '@colyseus/schema'
import ITicTacToeState from "../types/ITicTacToeState";
import Cell from './Cell';
import Unit from "./Unit";

export default class TicTacToeState extends Schema implements ITicTacToeState {
    @type({ collection: Cell })
  board: CollectionSchema<Cell>

  @type({ collection: Unit })
  units: CollectionSchema<Unit>

  @type("number")
  activePlayer = 0

  @type("number")
  winningPlayer = -1

  constructor() {
    super()

    this.board = new CollectionSchema<Cell>()

    const mapRadius = 3
    this.createBoard(mapRadius)

    this.units = new CollectionSchema<Unit>()
  }

  createBoard(mapRadius: number) {
    let id = 0
    for (let q = -mapRadius; q <= mapRadius; q++) {
      const r1 = Math.max(-mapRadius, -q - mapRadius)
      const r2 = Math.min(mapRadius, -q + mapRadius)
      for (let r = r1; r <= r2; r++) {
        const cell = new Cell(q, r, -q-r)
        cell.setId(id)
        this.board.add(cell)
        id++;
      }
    }
  }
}

