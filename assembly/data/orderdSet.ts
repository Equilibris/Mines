class OrderedSet<T> {
	data: Array<T> = []
	map: Map<u32, u32> = new Map()

	constructor(private hash: (e: T) => u32) {}

	unshift(element: T): void {}
	push(element: T): void {}

	// push preserve priority
	pushPP(element: T): void {
		
	}
}
