// const fs = require('fs')
// const loader = require('@assemblyscript/loader')
// const imports = {
// 	/* imports go here */
// }
// const wasmModule = loader.instantiateSync(
// 	fs.readFileSync(__dirname + '/optimized.wasm'),
// 	imports
// )
// module.exports = wasmModule.exports

const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils')

/**
 * @type {Parameters<typeof validate>[0]}
 */
const schema = {
	type: 'object',
	properties: {
		test: {
			type: 'string',
		},
	},
}

function getData(url) {
	const request = new XMLHttpRequest()

	request.responseType = 'arraybuffer'
	request.open('GET', url, false)
	request.send(null)

	if (request.status === 200) {
		return request.response
	}
}

/**
 * @this {import('webpack').LoaderContext<{}>}
 * @param {*} source
 * @returns {string}
 */
module.exports = function (source) {
	const options = getOptions(this)

	validate(schema, options, {
		name: 'Example Loader',
		baseDataPath: 'options',
	})

	const url = source.replace('export default', '').replace(';', '')

	return `
import { instantiateSync } from '@assemblyscript/loader';

${getData.toString()}
console.log(getData)

const imports = {
	/* imports go here */
};
const data = getData(${url})

console.log(data,${url})

const wasmModule = instantiateSync(data);
export default wasmModule.exports;`
}
