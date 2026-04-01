import { readFile } from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

const allowedSlugs = ['about', 'policies']

export function generateStaticParams() {
  return allowedSlugs.map((slug) => ({ slug }))
}

const components: Components = {
  table: ({ children }) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-muted">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-border">
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr className="transition-colors hover:bg-muted/50">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-muted-foreground align-top">
      {children}
    </td>
  ),
  code: ({ children }) => (
    <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground">
      {children}
    </code>
  ),
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
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {content}
        </ReactMarkdown>
      </article>
    </main>
  )
}