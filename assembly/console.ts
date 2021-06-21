export declare function flush(): void

export declare function logI(param: i64): void
export declare function putC(char: i32): void

export declare function putI(int: i32): void

export function putS(string: string): void {
	for (let char = 0; char < string.length; char++) {
		const c = string.charCodeAt(char)
		putC(c)
	}
}
export function logS(string: string): void {
	putS(string)
	flush()
}

export function logIArray<T extends number>(arr: Array<T>): void {
	putS(`[ `)

	const l = arr.length as u32

	for (let index: u32 = 0; index < l; index++) {
		putI(arr[index])
		putS(', ')
	}
	putS(']')
	flush()
}
export function logIStaticArray<T extends number>(arr: StaticArray<T>): void {
	putS(`[ `)

	const l = arr.length as u32

	for (let index: u32 = 0; index < l; index++) {
		putI(arr[index])
		putS(', ')
	}
	putS(']')
	flush()
}
