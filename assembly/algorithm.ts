import { logS, putI } from './console'
import { Game } from './game'
import { Point, pointToString } from './point'
import { render } from './renderer'

function surroundingPoints(point: Point): StaticArray<Point> {
	const points = new StaticArray<Point>(8)

	points[0] = { x: point.x - 1, y: point.y - 1 }
	points[1] = { x: point.x - 1, y: point.y }
	points[2] = { x: point.x - 1, y: point.y + 1 }

	points[3] = { x: point.x, y: point.y - 1 }
	points[4] = { x: point.x, y: point.y + 1 }

	points[5] = { x: point.x + 1, y: point.y - 1 }
	points[6] = { x: point.x + 1, y: point.y }
	points[7] = { x: point.x + 1, y: point.y + 1 }

	return points
}

export namespace v1 {
	function Objective(
		game: Game,
		priorityStackQueue: Array<Point>,
		resolved: Set<u32>,
		unresolved: Set<u32>
	): void {
		while (priorityStackQueue.length) {
			const current = priorityStackQueue.pop()

			if (resolved.has(game.hash(current))) continue

			const state = game.reveal(current)

			if (state < 0) continue
			else if (state == 0) {
				const points = surroundingPoints(current)

				for (let i = 0; i < points.length; i++) {
					unresolved.add(game.hash(points[i]))
					priorityStackQueue.push(points[i])
				}

				resolved.add(game.hash(current))
				unresolved.delete(game.hash(current))
			} else {
				const points = surroundingPoints(current)

				const flags = new Array<Point>()
				const free = new Array<Point>()
				const localUnresolved = new Array<Point>()

				for (let i = 0; i < points.length; i++) {
					const current = points[i]

					if (!game.isRevealed(current)) free.push(current)
					if (
						game.isRevealed(current) &&
						game.inBounds(current.x, current.y) &&
						game.inspect(current) == -1
					)
						flags.push(current)
					if (unresolved.has(game.hash(current))) localUnresolved.push(current)
				}
				if (state == flags.length) {
					for (let i = 0; i < localUnresolved.length; i++) {
						priorityStackQueue.push(localUnresolved[i])
					}
					for (let i = 0; i < free.length; i++) {
						priorityStackQueue.push(free[i])
					}
				} else if (free.length == 0)
					logS(`${pointToString(current)} is in progress of resolving`)
				else if (free.length == state - flags.length) {
					for (let i = 0; i < free.length; i++) game.flag(free[i])

					for (let i = 0; i < localUnresolved.length; i++) {
						priorityStackQueue.push(localUnresolved[i])
					}
				} else {
					unresolved.add(game.hash(current))
					continue
				}
				resolved.add(game.hash(current))
				unresolved.delete(game.hash(current))
			}
		}
	}
	function Guess(game: Game, unresolved: Set<Point>): void {
		// full body guess model vs most probable guess model
	}

	export function solve(game: Game): void {
		const priorityStackQueue = new Array<Point>() // should be an OrderedSetStackQueue
		const unresolved = new Set<u32>()
		const resolved = new Set<u32>()

		const initial = game.getInitialPoint()

		unresolved.add(game.hash(initial))

		let lastCount: u32

		while (!game.solved) {
			do {
				lastCount = game.revealedCount

				const unresolvedElements = unresolved.values()

				for (let i = 0; i < unresolvedElements.length; i++)
					priorityStackQueue.push(game.unHash(unresolvedElements[i]))

				Objective(game, priorityStackQueue, resolved, unresolved)

				putI(lastCount)
				putI(game.revealedCount)

				render()
			} while (lastCount !== game.revealedCount)

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
