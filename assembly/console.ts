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
