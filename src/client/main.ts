import 'regenerator-runtime/runtime'
import Phaser from 'phaser'

import Bootstrap from './scenes/Bootstrap'
import Game from './scenes/Game'
import GameOver from "./scenes/GameOver";


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.CANVAS,
	width: window.innerWidth * window.devicePixelRatio,
	height: window.innerHeight * window.devicePixelRatio,
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
		}
	},
	scene: [Bootstrap, Game, GameOver]
}

export default new Phaser.Game(config)
