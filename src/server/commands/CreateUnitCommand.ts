import { Command} from "@colyseus/command";
import ITicTacToeState from "../../types/ITicTacToeState";
import Unit from "../Unit";
import {Client} from "colyseus";
import NextTurnCommand from "./NextTurnCommand";
import Cell from "../Cell";

type Payload = {
   cell: Cell
   client: Client
}

export default class CreateUnitCommand extends Command<ITicTacToeState, Payload>
{
   execute(data: Payload): Array<Command> | void | Promise<Array<Command>> | Promise<unknown> {
      const { client, cell } = data

      const clientId = this.room.clients.findIndex(c => c.id === client.id)

      if(!cell) {
         return
      }

      if(cell.playerId !== clientId) {
         return
      }

      const unit = new Unit();
      unit.playerId = clientId
      unit.cellId = cell.id

      this.state.units.add(unit)

      return [
          new NextTurnCommand()
      ]
   }

}
