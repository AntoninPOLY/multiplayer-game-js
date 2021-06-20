import Phaser from 'phaser'
import type Server from '../services/Server'
import ITicTacToeState from "../../types/ITicTacToeState";
import {IGameSceneData} from "../../types/scenes";
import ICell from "../../types/ICell";
import images from '../assets/*.png'
import IUnit from "../../types/IUnit";
import * as Honeycomb  from "honeycomb-grid";

export default class Game extends Phaser.Scene {
    private server: Server
    private cells: { display: Phaser.GameObjects.Polygon, value: ICell,  }[]
    private units: {display: Phaser.GameObjects.Image, value: IUnit}[]

    constructor() {
        super('game')
    }

    preload () {
        this.load.spritesheet('soldier', images.character, {frameWidth: 32, frameHeight: 32})
    }

    async create(data: IGameSceneData) {
        const { server } = data

        this.cells = [];
        this.units = [];

        this.server = server

        if(!this.server) {
            throw new Error('server instance failed')
        }

        await this.server.join()

        this.server.onceStateChanged(this.createBoard)
    }



    private createBoard = (state: ITicTacToeState) => {

        const Hex = Honeycomb.extendHex({
            size: 30,           // default: 1
            orientation: 'flat' // default: 'pointy'
        })
        const Grid = Honeycomb.defineGrid(Hex)
        const grid = Grid()

        state.board.forEach((cellState) => {
            const tile = Hex({q: cellState.q, r: cellState.r, s: cellState.s})

            grid.push(tile)

            const point = tile.toPoint()
            const corners = tile.corners()

            const rectShape = new Phaser.Geom.Polygon(corners)

           const hex = this.add.polygon(point.x, point.y, corners, 0xffffff)
                .setInteractive(rectShape, Phaser.Geom.Polygon.Contains)
                .on('pointerdown', () => {
                    console.log(cellState)
                    if(cellState.playerId !== this.server.playerIndex) {
                        console.warn("u can't do that")
                        return
                    }
                    this.server.createUnit(cellState)
                })

            //https://www.redblobgames.com/grids/hexagons/

            const x = cellState.q < 0 ? cellState.q * - 1 : cellState.q
            const z = cellState.r < 0 ? cellState.r * - 1 : cellState.r
            const y = cellState.s < 0 ? cellState.s * - 1 : cellState.s
            if (x == 3 || y == 3 || z == 3)
                hex.fillColor = 0xff0000;
            this.cells.push({
                display: hex,
                value: cellState,
            })


        })

        state.units.forEach((unit) => {
            const sprite = this.add.image(this.cells[unit.cellId].display.x, this.cells[unit.cellId].display.y, 'soldier', 0)
                .setScale(2)
                .setInteractive()
                .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                    console.log(unit)
                })

            this.units.push({
                display: sprite,
                value: unit
            })
        })

        this.server?.onBoardChanged(this.handleBoardChanged, this)
        this.server?.onUnitAdded(this.handleUnitAdded, this)
        this.server?.onUnitChanged(this.handleUnitChanged, this)
        this.server?.onPlayerTurnChanged(this.handlePlayerTurnChanged, this)
        this.server?.onPlayerWon(this.handlePlayerWon, this)

        this.cameras.main.centerOn(this.cells[0].display.x, this.cells[0].display.y)
    }

    private handleBoardChanged(board: ICell[]) {
        console.log('board changed')
    }


    private handleUnitChanged(unit: IUnit, index: number) {
            console.log('looool')
    }

    private handleUnitAdded(unit: IUnit) {
        const cell = this.cells[unit.cellId].display

        const sprite = this.add.sprite(cell.x, cell.y, 'soldier', 0)
            .setScale(2)

        this.units.push({
            display: sprite,
            value: unit
        })
    }

    private handlePlayerTurnChanged(playerIndex: number) {
        // TODO : show message letting player know its their turn
    }

    private handlePlayerWon(playerIndex: number) {
        if(this.server?.playerIndex == playerIndex) {
            console.log('you won')
        } else {
            console.log('you lost')
        }
    }
}
