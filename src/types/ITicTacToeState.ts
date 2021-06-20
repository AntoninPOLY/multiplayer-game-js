import { Schema, CollectionSchema } from '@colyseus/schema'
import Unit from "../server/Unit";
import Cell from "../server/Cell";


export enum GameState
{
	WaitingForPlayers,
	Playing,
	Finished
}

export interface ITicTacToeState extends Schema
{

	board: CollectionSchema<Cell>

	units: CollectionSchema<Unit>

	activePlayer: number

	winningPlayer: number

}

export default ITicTacToeState
