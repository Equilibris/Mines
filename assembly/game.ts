import { Point, randomPoint } from './point'

export class Game {
	pointList: StaticArray<Point>
	pointGrid: StaticArray<StaticArray<i32>> // -1 = bomb
	gameGrid: StaticArray<StaticArray<i32>> // -1 = flag, -2 = undiscovered

	constructor(private size: i32, private count: i32) {
		this.gameGrid = new StaticArray<StaticArray<i32>>(this.count)

		this.pointGrid = new StaticArray(this.count)

		for (let i = 0; i < this.pointGrid.length; i++) {
			this.pointGrid = new StaticArray(this.count)
		}
		this.pointList = new StaticArray(count)

		let itrCount = 0

		while (itrCount < this.count) {
			const p = randomPoint(
				{ x: 0, y: 0 },
				{ x: this.size - 1, y: this.size - 1 }
			)

			// TODO: add not
			if (!this.pointGrid[p.x][p.y]) {
				this.pointGrid[p.x][p.y] = -1
				this.pointList[itrCount] = p
				itrCount++
			}
		}

		const bombAt = (
			pointGrid: StaticArray<StaticArray<i32>>,
			x: i32,
			y: i32
		): i32 => {
			return x >= 0 && y >= 0 ? +(pointGrid[x][y] == -1) : 0
		}

		for (let x = 0; x < this.size; x++) {
			for (let y = 0; y < this.size; y++) {
				if (!this.pointGrid[x][y])
					this.pointGrid[x][y] =
						bombAt(this.pointGrid, x - 1, y - 1) +
						bombAt(this.pointGrid, x, y - 1) +
						bombAt(this.pointGrid, x + 1, y - 1) +
						bombAt(this.pointGrid, x - 1, y) +
						bombAt(this.pointGrid, x + 1, y) +
						bombAt(this.pointGrid, x - 1, y + 1) +
						bombAt(this.pointGrid, x, y + 1) +
						bombAt(this.pointGrid, x + 1, y + 1)
			}
		}
	}
}
