const fs = require('fs')
const { DOMParser, XMLSerializer } = require('@xmldom/xmldom')
const html2md = require('html-to-md')

const input = './xml'
const output = './md'

start()

function getMarkdown(entry) {
	const subject = entry.getElementsByTagName('subject')
	const subjectNode = Array.from(subject)[0]
	const title = subjectNode.textContent

	const event = entry.getElementsByTagName('event')
	const eventNode = Array.from(event)[0]
	const eventHTML = new XMLSerializer().serializeToString(eventNode)
	const content = html2md(eventHTML, { skipTags: ['event'] })

	return `---\nlayout: post\ntitle: "${title}"\ncategories: event\n---\n${content}`
}

function writeFile(entry) {
	try {
		const eventtime = entry.getElementsByTagName('eventtime')
		const timestamp = Array.from(eventtime)[0].textContent
		const filename = timestamp.split(' ')[0]
		const md = getMarkdown(entry)

		fs.writeFileSync(`${output}/${filename}.md`, md, { encoding: 'utf8' })

		console.log(`Created file: ${filename}.md`)
	} catch (error) {
		console.error(error)
	}
}

function readFile(file) {
	try {
		fs.readFile(`${input}/${file}`, 'utf8', (error, xml) => {
			if (error) throw error

			const parser = new DOMParser()
			const doc = parser.parseFromString(xml, 'text/xml')
			const entries = doc.getElementsByTagName('entry')

			Array.from(entries).forEach(entry => writeFile(entry))
		})
	} catch (error) {
		console.log(error)
	}
}

function start() {
	try {
		fs.readdir(input, 'utf8', (error, files) => {
			if (error) throw error

			files.forEach(file => readFile(file))
		})
	} catch (error) {
		console.log(error)
	}
}
