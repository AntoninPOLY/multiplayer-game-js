import {Command} from '@colyseus/command'
import ITicTacToeState from "../../types/ITicTacToeState";

type Payload = {

}


export default class CheckWinnerCommand extends Command<ITicTacToeState, Payload>
{
    private determineWin() {
        return false
    }

    execute(): Array<Command> | void | Promise<Array<Command>> | Promise<unknown> {
       console.log('win')
    }
}
