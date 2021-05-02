import remark from 'remark'
import html from 'remark-html'
import * as highlight from 'remark-highlight.js'

export default async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(highlight).use(html).process(markdown)
  return result.toString()
}
