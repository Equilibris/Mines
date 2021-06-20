import { Game } from './game'
import { Point } from './point'
import { render } from './renderer'

export namespace v1 {
	function Objective(
		game: Game,
		priorityStackQueue: Array<Point>,
		unresolved: Set<Point>
	): void {
		while (priorityStackQueue.length) {
			const current = priorityStackQueue.shift()

			const state = game.reveal(current)

			if (state == 0) {
				const p1: Point = { x: current.x - 1, y: current.y - 1 }
				const p2: Point = { x: current.x - 1, y: current.y }
				const p3: Point = { x: current.x - 1, y: current.y + 1 }

				const p4: Point = { x: current.x, y: current.y - 1 }
				const p5: Point = { x: current.x, y: current.y + 1 }

				const p6: Point = { x: current.x + 1, y: current.y - 1 }
				const p7: Point = { x: current.x + 1, y: current.y }
				const p8: Point = { x: current.x + 1, y: current.y + 1 }

				unresolved.add(p1)
				unresolved.add(p2)
				unresolved.add(p3)
				unresolved.add(p4)
				unresolved.add(p5)
				unresolved.add(p6)
				unresolved.add(p7)
				unresolved.add(p8)

				priorityStackQueue.unshift(p1)
				priorityStackQueue.unshift(p2)
				priorityStackQueue.unshift(p3)
				priorityStackQueue.unshift(p4)
				priorityStackQueue.unshift(p5)
				priorityStackQueue.unshift(p6)
				priorityStackQueue.unshift(p7)
				priorityStackQueue.unshift(p8)
			}
		}
	}
	function Guess(game: Game, unresolved: Set<Point>): void {}

	export function solve(game: Game): void {
		const priorityStackQueue = new Array<Point>() // should be an OrderedSetStackQueue
		const unresolved = new Set<Point>()

		const initial = game.getInitialPoint()

		priorityStackQueue.push(initial)
		unresolved.add(initial)

		while (!game.solved) {
			// Objective(game, priorityStackQueue, unresolved)

			render()

			return

			// if (game.solved) break
			// Guess(game, unresolved)

			// render()

			// const values = unresolved.values()

			// for (let i = 0; i < values.length; i++) {
			// 	priorityStackQueue.push(values[i])
			// }
			// unresolved.clear()
		}
	}
}
