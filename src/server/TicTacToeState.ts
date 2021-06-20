import {CollectionSchema, MapSchema, Schema, type} from '@colyseus/schema'
import ITicTacToeState from "../types/ITicTacToeState";
import Cell from './Cell';
import Unit from "./Unit";
import Board from "./Board";
import Player from "./Player";

export default class TicTacToeState extends Schema implements ITicTacToeState {
  @type( Board )
  board: Board

  @type({ collection: Unit })
  units: CollectionSchema<Unit>

  @type("number")
  activePlayer = 0

  @type({ collection: Player })
  players: CollectionSchema<Player>

  @type("number")
  winningPlayer = -1

  constructor() {
    super()

    this.board = new Board(3)

    this.board.createBoard()

    this.players = new CollectionSchema<Player>()

    this.units = new CollectionSchema<Unit>()
  }
}

