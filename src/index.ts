import './index.scss'

import { Game } from './game'
import { Point } from './point'

const size = 10
const percent = 0.5

const game = new Game(
	size,
	size ** 2 * percent,
	document.getElementById('root')
)


game.build()
console.log(game.pointGrid)
