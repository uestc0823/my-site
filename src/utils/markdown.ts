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

function loadModules(): Record<string, { default: string }> {
  try {
    return import.meta.glob('/src/content/blog/*.md', {
      query: '?raw',
      eager: true,
    }) as Record<string, { default: string }>
  } catch {
    console.warn('Failed to load markdown modules')
    return {}
  }
}

const modules = loadModules()

function getRawContent(mod: unknown): string {
  if (typeof mod === 'string') return mod
  if (mod && typeof mod === 'object' && 'default' in mod) {
    return String((mod as { default: unknown }).default)
  }
  return String(mod)
}

function parseFrontmatter(raw: string): { frontmatter: BlogFrontmatter; body: string } {
  const fallback: BlogFrontmatter = { title: '', date: '', tag: '', excerpt: '', cover: '', readTime: '' }
  try {
    const trimmed = raw.trim()
    if (!trimmed.startsWith('---')) {
      return { frontmatter: fallback, body: trimmed }
    }

    const secondDash = trimmed.indexOf('---', 3)
    if (secondDash === -1) {
      return { frontmatter: fallback, body: trimmed }
    }

    const yamlBlock = trimmed.slice(3, secondDash).trim()
    const body = trimmed.slice(secondDash + 3).trim()

    const frontmatter: Record<string, string> = {}
    for (const line of yamlBlock.split('\n')) {
      const colonIdx = line.indexOf(':')
      if (colonIdx === -1) continue
      const key = line.slice(0, colonIdx).trim()
      let value = line.slice(colonIdx + 1).trim()
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
  } catch {
    return { frontmatter: fallback, body: raw }
  }
}

function extractSlug(path: string): string {
  const filename = path.split('/').pop() ?? ''
  return filename.replace(/\.md$/, '')
}

const allPosts: BlogPostMeta[] = (() => {
  try {
    return Object.entries(modules)
      .map(([path, mod]) => {
        const { frontmatter } = parseFrontmatter(getRawContent(mod))
        return { ...frontmatter, slug: extractSlug(path) }
      })
      .sort((a, b) => b.date.localeCompare(a.date))
  } catch {
    console.warn('Failed to parse blog posts')
    return []
  }
})()

const postCache: Record<string, { frontmatter: BlogFrontmatter; body: string } | null> = {}

export function getAllPosts(): BlogPostMeta[] {
  return allPosts
}

export function getPostBySlug(slug: string): { frontmatter: BlogFrontmatter; body: string } | null {
  if (slug in postCache) return postCache[slug]

  try {
    const entry = Object.entries(modules).find(([path]) => extractSlug(path) === slug)
    if (!entry) {
      postCache[slug] = null
      return null
    }

    const result = parseFrontmatter(getRawContent(entry[1]))
    postCache[slug] = result
    return result
  } catch {
    postCache[slug] = null
    return null
  }
}
