import {Client, Room} from 'colyseus'
import { Dispatcher} from "@colyseus/command";
import { Message } from '../types/messages'
import TicTacToeState from './TicTacToeState'
import PlayerSelectionCommand from "./commands/PlayerSelectionCommand";
import MakeNewPlayerTerritory from "./commands/MakeNewPlayerTerritory";
import CreateUnitCommand from "./commands/CreateUnitCommand";
import Cell from "./Cell";

export default class TicTacToe extends Room<TicTacToeState>
{
    private dispatcher = new Dispatcher(this)

    onCreate() {
        this.maxClients = 2
        this.setState(new TicTacToeState())

        for (let i = 0; i < this.maxClients; i++) {
            this.dispatcher.dispatch(new MakeNewPlayerTerritory(), {
                index: i
            })
        }

        this.onMessage(Message.PlayerSelection, (client, message: { index: number }) => {
            this.dispatcher.dispatch(new PlayerSelectionCommand(), {
                client,
                index: message.index
            })
        })

        this.onMessage(Message.CreateUnit, (client, message: { cell: Cell }) => {
            this.dispatcher.dispatch(new CreateUnitCommand(), {
                client,
                cell: message.cell
            })
        })
    }

    onJoin(client: Client): void | Promise<any> {
       const id = this.clients.findIndex(c => c.sessionId === client.sessionId)
        client.send(Message.PlayerIndex, { playerIndex: id })

    }
}
