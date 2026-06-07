export interface BlogFrontmatter {
  title: string
  date: string
  tag: string
  excerpt: string
  cover: string
  readTime: string
}

export interface BlogPostMeta extends BlogFrontmatter {
  slug: string
}

const modules = import.meta.glob('/src/content/blog/*.md', {
  query: '?raw',
  eager: true,
}) as Record<string, string>

function parseFrontmatter(raw: string): { frontmatter: BlogFrontmatter; body: string } {
  const trimmed = raw.trim()
  if (!trimmed.startsWith('---')) {
    return { frontmatter: { title: '', date: '', tag: '', excerpt: '', cover: '', readTime: '' }, body: trimmed }
  }

  const secondDash = trimmed.indexOf('---', 3)
  if (secondDash === -1) {
    return { frontmatter: { title: '', date: '', tag: '', excerpt: '', cover: '', readTime: '' }, body: trimmed }
  }

  const yamlBlock = trimmed.slice(3, secondDash).trim()
  const body = trimmed.slice(secondDash + 3).trim()

  const frontmatter: Record<string, string> = {}
  for (const line of yamlBlock.split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    let value = line.slice(colonIdx + 1).trim()
    // Strip surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    frontmatter[key] = value
  }

  return {
    frontmatter: {
      title: frontmatter.title ?? '',
      date: frontmatter.date ?? '',
      tag: frontmatter.tag ?? '',
      excerpt: frontmatter.excerpt ?? '',
      cover: frontmatter.cover ?? '',
      readTime: frontmatter.readTime ?? '',
    },
    body,
  }
}

function extractSlug(path: string): string {
  // /src/content/blog/my-post.md -> my-post
  const filename = path.split('/').pop() ?? ''
  return filename.replace(/\.md$/, '')
}

const allPosts: BlogPostMeta[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { frontmatter } = parseFrontmatter(raw)
    return { ...frontmatter, slug: extractSlug(path) }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

const postCache: Record<string, { frontmatter: BlogFrontmatter; body: string } | null> = {}

export function getAllPosts(): BlogPostMeta[] {
  return allPosts
}

export function getPostBySlug(slug: string): { frontmatter: BlogFrontmatter; body: string } | null {
  if (slug in postCache) return postCache[slug]

  const entry = Object.entries(modules).find(([path]) => extractSlug(path) === slug)
  if (!entry) {
    postCache[slug] = null
    return null
  }

  const result = parseFrontmatter(entry[1])
  postCache[slug] = result
  return result
}
