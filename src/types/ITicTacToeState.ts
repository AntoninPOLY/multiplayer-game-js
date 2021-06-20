import { Schema, CollectionSchema } from '@colyseus/schema'
import Unit from "../server/Unit";
import Cell from "../server/Cell";
import Board from "../server/Board";
import Player from "../server/Player";


export enum GameState
{
	WaitingForPlayers,
	Playing,
	Finished
}

export interface ITicTacToeState extends Schema
{

	board: Board

	units: CollectionSchema<Unit>

	players: CollectionSchema<Player>

	activePlayer: number

	winningPlayer: number

}

export default ITicTacToeState

