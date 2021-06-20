import { Point, randomPoint } from './point'
import { logS, putS, putI, flush } from './console'

function indexesOf<T extends number>(arr: StaticArray<T>, item: T): Array<u32> {
	const items: Array<u32> = []

	const l = arr.length as u32

	putS(`Indexes of ${item} including: [ `)

	for (let index: u32 = 0; index < l; index++) {
		if (arr[index] == item) {
			putI(index)
			putS(' ')

			items.push(index)
		}
	}
	putS(']')
	flush()
	return items
}

export class Game {
	private pointList: StaticArray<Point>
	private pointGrid: StaticArray<StaticArray<i8>> // -1 = bomb
	public gameGrid: StaticArray<StaticArray<i8>> // -1 = flag, -2 = undiscovered

	public revealedCount: u32 = 0
	get solved(): boolean {
		return this.revealedCount == this.size ** 2
	}

	constructor(public size: i32, public count: i32) {
		this.gameGrid = new StaticArray(size)

		this.pointGrid = new StaticArray(size)

		for (let i = 0; i < size; i++) {
			this.pointGrid[i] = new StaticArray(size)
			this.gameGrid[i] = new StaticArray(size)

			for (let index = 0; index < size; index++) {
				this.pointGrid[i][index] = 0
				this.gameGrid[i][index] = -2
			}
		}
		this.pointList = new StaticArray(count)

		let itrCount = 0

		while (itrCount < count) {
			const p = randomPoint({ x: 0, y: 0 }, { x: size - 1, y: size - 1 })

			// TODO: add not
			if (!this.pointGrid[p.x][p.y]) {
				this.pointGrid[p.x][p.y] = -1
				this.pointList[itrCount] = p
				itrCount++
			}
		}

		for (let x = 0; x < size; x++) {
			for (let y = 0; y < size; y++) {
				if (!this.pointGrid[x][y])
					this.pointGrid[x][y] =
						this.bombAt(x - 1, y - 1) +
						this.bombAt(x, y - 1) +
						this.bombAt(x + 1, y - 1) +
						this.bombAt(x - 1, y) +
						this.bombAt(x + 1, y) +
						this.bombAt(x - 1, y + 1) +
						this.bombAt(x, y + 1) +
						this.bombAt(x + 1, y + 1)
			}
		}
	}
	public inBounds(x: number, y: number): boolean {
		return x >= 0 && y >= 0 && x < this.size && y < this.size
	}

	private bombAt(x: i32, y: i32): i8 {
		return this.inBounds(x, y) ? +(this.pointGrid[x][y] == -1) : 0
	}

	public _stateOfPoint(x: i32, y: i32): i8 {
		return this.pointGrid[x][y]
	}
	public stateOfPoint(point: Point): i8 {
		return this.pointGrid[point.x][point.y]
	}
	public isRevealed(x: i32, y: i32): boolean {
		return this.gameGrid[x][y] != -2
	}

	public getInitialPoint(): Point {
		// this points to a random point of which its state is not 0
		// TODO: fix that
		const cursor: Point = { x: this.size / 2, y: this.size / 2 }

		const getYShift = (itr: i32): i32 =>
			((1 - 2 * (itr % 2)) * Math.floor(itr / 2)) as i32

		for (
			let itr = 1,
				items = indexesOf(this.pointGrid[cursor.y + getYShift(itr)], 0 as i8);
			itr < this.size / 2;
			itr++,
				items = items =
					indexesOf(this.pointGrid[cursor.y + getYShift(itr)], 0 as i8)
		) {
			if (!items.length) continue

			cursor.x = items[(items.length / 2) as u32]
			cursor.y += getYShift(itr)

			return cursor
		}
		return cursor // just to fix ts
	}

	public inspect(point: Point): i8 {
		return this.gameGrid[point.x][point.y]
	}
	public reveal(point: Point): i8 {
		if (!this.inBounds(point.x, point.y)) return -3 // Out of bounds

		if (this.gameGrid[point.x][point.y] == -2) this.revealedCount++

		const state = this.stateOfPoint(point)

		this.gameGrid[point.x][point.y] = state

		if (state == -1) throw 'revealed bomb'

		return state
	}
	public flag(point: Point): void {
		this.revealedCount++
		this.gameGrid[point.x][point.y] = -1
	}
	public hash(point: Point): u32 {
		return point.x + point.y * this.size
	}
}
