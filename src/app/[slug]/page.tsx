import { readFile } from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

const allowedSlugs = ['about', 'policies']

export function generateStaticParams() {
  return allowedSlugs.map((slug) => ({ slug }))
}

export default async function MarkdownPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!allowedSlugs.includes(slug)) notFound()

  const filePath = path.join(process.cwd(), 'src/static', `${slug}.md`)

  let content: string
  try {
    content = await readFile(filePath, 'utf-8')
  } catch {
    notFound()
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 my-10">
      <article className="prose prose-neutral dark:prose-invert max-w-none text-left">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </main>
  )
}