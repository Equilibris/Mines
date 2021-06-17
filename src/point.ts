export type MaybePoint = [number, number] | Point

export class Point {
	static fromArr([x, y]: [number, number]) {
		return new this(x, y)
	}
	static ensurePoint(maybePoint: MaybePoint) {
		return maybePoint instanceof this ? maybePoint : this.fromArr(maybePoint)
	}
	static randomInt(_bottom: MaybePoint, _top: MaybePoint) {
		const bottom = this.ensurePoint(_bottom),
			top = this.ensurePoint(_top)

		const random = [Math.random(), Math.random()]

		return new this(
			Math.round(bottom.x + random[0] * (top.x - bottom.x)),
			Math.round(bottom.y + random[1] * (top.y - bottom.y))
		)
	}

	constructor(public x: number, public y: number) {}

	eq(other: Point) {
		const x = this.x === other.x && this.y === other.y
		console.log(x)

		return x
	}

	get asArr() {
		return [this.x, this.y]
	}
}
