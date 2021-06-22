import { Point, MaybePoint } from './point'
import { Game as GameExec } from './asm/dist/build.type.d'
import './game.scss'

type Neighburs = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

enum PointState {
	UNREVIEALED,
	FLAGED,
}

const BOMB = '💣'

const getSymbol = (value: number): string =>
	value === -1 ? BOMB : String(value)

export class Game {
	constructor(
		private size: number,
		private mount: HTMLElement,
		public game: GameExec
	) {}

	build() {
		this.mount.classList.add('game')
		this.mount.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`

		for (let i = 0; i < this.size ** 2; i++) {
			const child = document.createElement('div')

			if (this.size <= 30)
				child.innerText = getSymbol(
					this.game._stateOfPoint(i % this.size, Math.floor(i / this.size))
				)

			if (child.innerText === BOMB) child.classList.add('bomb')

			if (this.size > 30) child.classList.add('small')

			if (this.size > 325) child.classList.add('tiny')

			this.mount.appendChild(child)
		}
	}
	render() {
		for (let i = 0; i < this.size ** 2; i++) {
			const child = this.mount.children.item(i)

			if (this.game._isRevealed(i % this.size, Math.floor(i / this.size)))
				child.classList.add('revealed')
		}
	}
}
