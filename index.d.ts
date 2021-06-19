declare module '*.scss' {
	const content: void
	export default content
}

declare module '*.wasm' {
	// Strongly type the exports with T
	// function wasmBuilderFunc<T>(
	// 	importsObject?: WebAssembly.Imports
	// ): Promise<{ instance: WebAssembly.Instance & { exports: T } }>

	// export = wasmBuilderFunc

	const url: string
	export default url
}
