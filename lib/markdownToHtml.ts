import remark from 'remark'
import html from 'remark-html'
// TODO: switch to import
// import highlight from 'remark-highlight.js'
const highlight = require('remark-highlight.js')

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(highlight).use(html).process(markdown)
  return result.toString()
}
