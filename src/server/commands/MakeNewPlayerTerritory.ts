import {Command} from '@colyseus/command'
import ITicTacToeState from "../../types/ITicTacToeState";

type Payload = {
    index: number
}

export default class MakeNewPlayerTerritory extends Command<ITicTacToeState, Payload>
{
    execute(data: Payload): Array<Command> | void | Promise<Array<Command>> | Promise<unknown> {
        const length = this.state.board.size - 1
        const indexOfCell = Math.floor(Math.random() * length)
        const cell = this.state.board.at(indexOfCell)
        if(cell) {
            cell.playerId = data.index
        }
    }
}
