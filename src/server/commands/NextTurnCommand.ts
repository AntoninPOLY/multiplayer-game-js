import { Command} from "@colyseus/command";
import ITicTacToeState from "../../types/ITicTacToeState";

export default class NextTurnCommand extends Command<ITicTacToeState>{
   execute(): Array<Command> | void | Promise<Array<Command>> | Promise<unknown> {
     const activePlayer = this.room.state.activePlayer

       if(activePlayer === 0) {
           this.room.state.activePlayer = 1
       } else {
           this.room.state.activePlayer = 0
       }
   }
}
