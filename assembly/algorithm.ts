import { putS } from './console'
import { Game } from './game'
import { Point } from './point'
import { render } from './renderer'

export namespace v1 {
	function Objective(
		game: Game,
		priorityStackQueue: Array<Point>,
		resolved: Set<u32>,
		unresolved: Set<u32>
	): void {
		while (priorityStackQueue.length) {
			const current = priorityStackQueue.shift()

			if (resolved.has(game.hash(current))) continue

			const state = game.reveal(current)

			if (state == -3) continue
			else if (state == 0) {
				putS(`current state = ${state}`)
				const p1: Point = { x: current.x - 1, y: current.y - 1 }
				const p2: Point = { x: current.x - 1, y: current.y }
				const p3: Point = { x: current.x - 1, y: current.y + 1 }

				const p4: Point = { x: current.x, y: current.y - 1 }
				const p5: Point = { x: current.x, y: current.y + 1 }

				const p6: Point = { x: current.x + 1, y: current.y - 1 }
				const p7: Point = { x: current.x + 1, y: current.y }
				const p8: Point = { x: current.x + 1, y: current.y + 1 }

				unresolved.add(game.hash(p1))
				priorityStackQueue.unshift(p1)
				unresolved.add(game.hash(p2))
				priorityStackQueue.unshift(p2)
				unresolved.add(game.hash(p3))
				priorityStackQueue.unshift(p3)
				unresolved.add(game.hash(p4))
				priorityStackQueue.unshift(p4)
				unresolved.add(game.hash(p5))
				priorityStackQueue.unshift(p5)
				unresolved.add(game.hash(p6))
				priorityStackQueue.unshift(p6)
				unresolved.add(game.hash(p7))
				priorityStackQueue.unshift(p7)
				unresolved.add(game.hash(p8))
				priorityStackQueue.unshift(p8)
			}

			resolved.add(game.hash(current))
		}
	}
	function Guess(game: Game, unresolved: Set<Point>): void {}

	export function solve(game: Game): void {
		const priorityStackQueue = new Array<Point>() // should be an OrderedSetStackQueue
		const unresolved = new Set<u32>()
		const resolved = new Set<u32>()

		const initial = game.getInitialPoint()

		priorityStackQueue.push(initial)
		unresolved.add(game.hash(initial))

		while (!game.solved) {
			Objective(game, priorityStackQueue, resolved, unresolved)

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
