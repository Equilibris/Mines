import { Point, MaybePoint } from './point'
import './game.scss'

type Neighburs = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

enum PointState {
	UNREVIEALED,
	FLAGED,
}

export class Game {
	pointList: Point[] = []
	pointGrid: (Point | Neighburs | null)[][]
	gameGrid: (PointState | Neighburs)[][]

	constructor(
		private size: number,
		private count: number,
		private mount: HTMLElement
	) {
		this.gameGrid = [...Array(this.size).keys()].map(
			(_) => [...Array(this.size).keys()].fill(null) as null[]
		)
		this.pointGrid = [...Array(this.size).keys()].map(
			(_) => [...Array(this.size).keys()].fill(null) as null[]
		)
	}

	generatePoints() {
		this.pointGrid = [...Array(this.size).keys()].map(
			(_) => [...Array(this.size).keys()].fill(null) as null[]
		)

		let count = 0

		while (count < this.count) {
			const p = Point.randomInt([0, 0], [this.size - 1, this.size - 1])

			// TODO: add not
			if (!this.pointGrid[p.x][p.y]) {
				this.pointGrid[p.x][p.y] = p
				this.pointList.push(p)
				count++
			}
		}
		const bombAt = (x: number, y: number) =>
			(this.pointGrid[x] ?? [])[y] instanceof Point

		for (let x = 0; x < this.size; x++) {
			for (let y = 0; y < this.size; y++) {
				if (!this.pointGrid[x][y])
					this.pointGrid[x][y] =
						//@ts-ignore
						bombAt(x - 1, y - 1) +
						bombAt(x, y - 1) +
						bombAt(x + 1, y - 1) +
						bombAt(x - 1, y) +
						bombAt(x + 1, y) +
						bombAt(x - 1, y + 1) +
						bombAt(x, y + 1) +
						bombAt(x + 1, y + 1)
			}
		}
	}

	build() {
		this.generatePoints()

		this.mount.classList.add('game')
		this.mount.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`

		for (let i = 0; i < this.size ** 2; i++) {
			this.mount.appendChild(document.createElement('div'))
		}

		for (const point of this.pointList) {
			this.mount
		}
	}
}
