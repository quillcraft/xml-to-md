const fs = require('fs')

const input = './xml'
const output = './md'

////////////////////////////////////////////////////////////////////////////////
// Create Markdown files

// function createMarkdown(data) {
// 	try {
// 		fs.writeFileSync(`${output}/${filename}`, md, { encoding: 'utf8' })
// 		console.log(`Created file: ${filename}`)

// 	} catch (error) {
// 		console.error(error)
// 	}
// }

////////////////////////////////////////////////////////////////////////////////
// Start converter

function start() {
	try {
		// fs.readFile(`${input}/${filename}`, 'utf8', (error, filedata) => {
		// 	if (error) throw error

		// 	createMarkdown(filedata)
		// })

	} catch (error) {
		console.log(error)
	}
}

start()
