import { Client, Room } from 'colyseus.js'
import Phaser from 'phaser'
import { Message } from '../../types/messages'
import ITicTacToeState from "../../types/ITicTacToeState";
import IUnit from "../../types/IUnit";
import ICell from "../../types/ICell";

export default class Server {
    private client: Client
    private events: Phaser.Events.EventEmitter

    private room?: Room<ITicTacToeState>
    private _playerIndex = -1

    get playerIndex() {
        return this._playerIndex
    }

    constructor() {
        this.client = new Client('ws://localhost:2567')
        this.events = new Phaser.Events.EventEmitter()
    }

    async join() {
        this.room = await this.client.joinOrCreate<ITicTacToeState>('tictactoe')

        this.room.onMessage(Message.PlayerIndex, (message: { playerIndex: number }) => {
            this._playerIndex = message.playerIndex
            console.log(this.playerIndex)
        })

        this.room.onStateChange.once(state => {
            this.events.emit('once-state-changed', state)
        })
        this.room.state.onChange = (changes) => {
            changes.forEach(change => {
                console.log(change)
            })
        }

       // this.room.state.board.onAdd = (cell, key) => {
            //console.log('cell added', cell, key)
        //}

        this.room.state.units.onAdd = (unit, key) => {
            this.events.emit('unit-added', unit, key)
            // add your player entity to the game world!

            // If you want to track changes on a child object inside a map, this is a common pattern:
            unit.onChange = (changes) => {
                this.events.emit('unit-changed', changes, key)
            };
        }


    }

    makeSelection(id: number) {
        if(!this.room) {
            return
        }

        if(this.playerIndex !== this.room.state.activePlayer) {
            console.warn('this is not your turn')
            return
        }

        this.room.send(Message.PlayerSelection, {index: id})
    }

    createUnit(cell: ICell) {
        if(!this.room) {
            return
        }

        if(this.playerIndex !== this.room.state.activePlayer) {
            console.warn('this is not your turn')
            return
        }

        this.room.send(Message.CreateUnit, {cell: cell})

    }

    leave() {
        this.room?.leave()
        this.events.removeAllListeners()
    }

    onceStateChanged(cb: (state: ITicTacToeState) => void, context?: any) {
        this.events.once('once-state-changed', cb, context)
    }

    onBoardChanged(cb: (board: ICell[]) => void, context?: any) {
        this.events.on('board-changed', cb, context)
    }

    onUnitAdded(cb: (unit: IUnit, cell: ICell) => void, context?: any) {
        this.events.on('unit-added', cb, context)
    }

    onUnitChanged(cb: (unit: IUnit, id: number) => void, context?: any) {
        this.events.on('unit-changed', cb, context)
    }

    onPlayerTurnChanged(cb: (playerIndex: number) => void, context?: any) {
        this.events.on('player-turn-changed', cb, context)
    }

    onPlayerWon(cb: (playerIndex: number) => void, context?: any) {
        this.events.on('player-win', cb, context)
    }
}
