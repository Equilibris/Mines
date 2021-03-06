import './index.scss'

import { Game } from './game'
import { Point } from './point'

import * as wasTypes from './asm/dist/build.type.d'
import was from './asm/dist/build.wasm'
import { Imports, instantiate } from '@assemblyscript/loader'

let str = ''

const renderPointer = {
	render: (): void => {
		console.log('rendering')
	},
}

;(async () => {
	const { exports } = await instantiate<typeof wasTypes>(
		await (await fetch(was)).arrayBuffer(),
		{
			console: {
				logI: console.log,
				putC(char: number) {
					str += String.fromCharCode(char)
				},
				putI(int: number) {
					str += String(int)
				},
				flush() {
					console.log(str)
					str = ''
				},
			},
			renderer: {
				render: () => renderPointer.render(),
			},
		}
	)

	const size = 20
	const count = size ** 2 * 0.15

	const game = new exports.Game(size, count)

	const renderer = new Game(size, document.getElementById('root'), game)

	renderPointer.render = () => renderer.render()

	renderer.build()

	console.log(game.stateOfPoint(game.getInitialPoint()))

	exports.v1.solve(game.valueOf())
})()
