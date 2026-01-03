import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

export interface MarkdownFile {
  slug: string
  content: string
  data: {
    title?: string
    [key: string]: any
  }
  html: string
}

export async function getMarkdownFile(filename: string): Promise<MarkdownFile | null> {
  try {
    const filePath = path.join(process.cwd(), 'content', filename)

    if (!fs.existsSync(filePath)) {
      console.warn(`Markdown file not found: ${filename}`)
      return null
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(content)

    const html = processedContent.toString()

    return {
      slug: filename.replace(/\.md$/, ''),
      content,
      data,
      html
    }
  } catch (error) {
    console.error(`Error reading markdown file ${filename}:`, error)
    return null
  }
}

export async function getAllMarkdownFiles(): Promise<MarkdownFile[]> {
  const files = [
    'A Word from the CEO – Joel Tiago.md',
    'AISOD PAIED Program Syllabus (2026 Edition).md',
    'Conclusion_ Your Journey to Practical AI Mastery (PAIED Program).md'
  ]

  const markdownFiles: MarkdownFile[] = []

  for (const file of files) {
    const markdownFile = await getMarkdownFile(file)
    if (markdownFile) {
      markdownFiles.push(markdownFile)
    }
  }

  return markdownFiles
}

export function extractMonthFromFilename(filename: string): number | null {
  const match = filename.match(/Month (\d+)/i)
  return match ? parseInt(match[1]) : null
}