import {Command} from '@colyseus/command'
import ITicTacToeState from "../../types/ITicTacToeState";
import {Client} from "colyseus";
import CheckWinnerCommand from "./CheckWinnerCommand";

type Payload = {
    client: Client
    index:  number
}

export default class PlayerSelectionCommand extends Command<ITicTacToeState> {
    execute(data: Payload) {
        const { client, index } = data

        const clientId = this.room.clients.findIndex(c => c.id === client.id)

        if(clientId !== this.room.state.activePlayer) {
            return
        }


        console.log(index)
    }
}
