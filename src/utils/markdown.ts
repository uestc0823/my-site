import type { CardColor } from 'animal-island-ui'

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

export interface HeadingItem {
  id: string
  text: string
  level: number
  /** 1-based line number in the markdown body, used to align TOC with rendered headings */
  line: number
}

/** 博客标签 → 卡片主题色，Blog 列表和文章页共用一份 */
export const TAG_COLOR_MAP: Record<string, CardColor> = {
  '工具实践': 'app-green',
  '技术笔记': 'app-blue',
  '项目日志': 'warm-peach-pink',
  '跨界探索': 'app-orange',
  '随笔杂谈': 'purple',
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w一-鿿\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Extract h1-h4 headings and give duplicates stable unique ids
 * (e.g. three "总结" headings become 总结 / 总结-1 / 总结-2).
 */
export function extractHeadings(markdown: string): HeadingItem[] {
  const items: HeadingItem[] = []
  const seen = new Map<string, number>()
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  let inCodeBlock = false

  lines.forEach((line, index) => {
    if (line.trimStart().startsWith('```')) {
      inCodeBlock = !inCodeBlock
      return
    }
    if (inCodeBlock) return

    const match = line.match(/^(#{1,4})\s+(.+)$/)
    if (!match) return

    const text = match[2].replace(/\*\*/g, '').trim()
    const base = slugifyHeading(text) || 'section'
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)

    items.push({
      id: count === 0 ? base : `${base}-${count}`,
      text,
      level: match[1].length,
      line: index + 1,
    })
  })

  return items
}
