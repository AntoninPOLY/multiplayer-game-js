import Phaser from 'phaser'
import {IGameOverSceneData} from "../../types/scenes";

export default class GameOver extends Phaser.Scene {
    constructor() {
        super('game-over');
    }

    create(data: IGameOverSceneData) {
        const text = data.winner ? 'You Won!' : 'You lost'

        const { width, height } = this.scale

        this.add.text(width * 0.5, height * 0.5, text, {
            fontSize: '40px'
        })
            .setOrigin(0.5)

        this.input.keyboard.once('keyup_SPACE', () => {
            if(data.onRestart) {
                data.onRestart
            }
        })
    }
}
