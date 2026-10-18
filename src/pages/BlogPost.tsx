import React, { useEffect, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { Divider, CodeBlock } from 'animal-island-ui'
import Title from '../components/Title/Title'
import { getPostBySlug, extractHeadings, TAG_COLOR_MAP } from '../utils/markdown'
import styles from '../styles/blogPost.module.less'

interface BlogPostProps {
  slug: string
  onNavigate: (path: string) => void
}

const FONT_FAMILY = "Nunito, 'Noto Sans SC', 'Zen Maru Gothic', -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"

const S = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
    animation: 'fadeInUp 0.5s ease',
    fontFamily: FONT_FAMILY,
  } as React.CSSProperties,
  metaBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontSize: 14,
    color: '#8a7b66',
    marginTop: 20,
    marginBottom: 20,
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,
  tagPill: {
    borderRadius: 16,
    padding: '2px 12px',
    fontWeight: 700,
    fontSize: 13,
    color: '#fff',
  } as React.CSSProperties,
  coverImage: {
    borderRadius: 16,
    width: '100%',
    maxHeight: 400,
    objectFit: 'cover' as const,
    marginBottom: 20,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  } as React.CSSProperties,
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    color: '#0f7f75',
    fontWeight: 700,
    fontSize: 16,
    cursor: 'pointer',
    textDecoration: 'none',
    marginTop: 24,
    marginBottom: 40,
    transition: 'opacity 0.2s',
  } as React.CSSProperties,
  notFound: {
    maxWidth: 800,
    margin: '0 auto',
    textAlign: 'center' as const,
    paddingTop: 80,
    fontFamily: FONT_FAMILY,
  } as React.CSSProperties,
}

const TAG_PILL_COLORS: Record<string, string> = {
  '工具实践': '#5AC28C',
  '技术笔记': '#5B8DEF',
  '项目日志': '#E89AAB',
  '跨界探索': '#E8854D',
  '随笔杂谈': '#9B6DD7',
}

function extractTextContent(children: React.ReactNode): string {
  return React.Children.toArray(children)
    .map(child => {
      if (typeof child === 'string' || typeof child === 'number') return String(child)
      if (React.isValidElement(child)) return extractTextContent(child.props.children)
      return ''
    })
    .join('')
}

function headingId(children: React.ReactNode): string {
  const text = extractTextContent(children)
  return text.toLowerCase().replace(/[^\w一-鿿\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

const BlogPost: React.FC<BlogPostProps> = ({ slug, onNavigate }) => {
  const post = getPostBySlug(slug)

  // 用共享的标题提取器生成与 TOC 完全一致的 id（重复标题会自动加序号）
  const headingIdsByLine = useMemo(() => {
    const ids = new Map<number, string>()
    if (!post) return ids
    for (const item of extractHeadings(post.body)) {
      ids.set(item.line, item.id)
    }
    return ids
  }, [post])

  useEffect(() => {
    const main = document.querySelector('main')
    if (main) main.scrollTo({ top: 0 })
  }, [slug])

  if (!post) {
    return (
      <div style={S.notFound}>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#4a4238', marginBottom: 12 }}>文章未找到</div>
        <div style={{ fontSize: 17, color: '#6e6557', marginBottom: 24 }}>抱歉，您访问的文章不存在。</div>
        <a
          href="#/blog"
          style={S.backLink}
          onClick={(e) => {
            e.preventDefault()
            onNavigate('/blog')
          }}
        >
          返回博客列表
        </a>
      </div>
    )
  }

  const { frontmatter, body } = post
  const tagColor = TAG_COLOR_MAP[frontmatter.tag] ?? 'app-blue'
  const pillColor = TAG_PILL_COLORS[frontmatter.tag] ?? '#5B8DEF'

  return (
    <div style={S.container}>
      <Title size="large" color={tagColor}>{frontmatter.title}</Title>

      <div style={S.metaBar}>
        <span style={{ ...S.tagPill, background: pillColor }}>#{frontmatter.tag}</span>
        <span>{frontmatter.date}</span>
        <span>·</span>
        <span>{frontmatter.readTime}</span>
      </div>

      {frontmatter.cover && (
        <img src={frontmatter.cover} alt={frontmatter.title} loading="lazy" decoding="async" style={S.coverImage} />
      )}

      <Divider type="line-teal" />

      <div className={styles.content}>
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
          components={{
            pre({ children, ...props }) {
              try {
                const childArr = React.Children.toArray(children)
                for (const child of childArr) {
                  if (React.isValidElement(child) && (child as React.ReactElement).type === 'code') {
                    const codeProps = (child as React.ReactElement<{ children?: React.ReactNode }>).props
                    if (codeProps?.children) {
                      const codeString = String(codeProps.children).replace(/\n$/, '')
                      return <CodeBlock code={codeString} />
                    }
                  }
                }
              } catch {
                // fallback
              }
              return <pre {...props}>{children}</pre>
            },
            // 正文截图统一懒加载，避免长文一进来就把所有大图拉下来
            img({ src, alt }) {
              return <img src={src ?? ''} alt={alt ?? ''} loading="lazy" decoding="async" />
            },
            h1: ({ node, children, ...props }) => <h1 id={headingIdsByLine.get(node?.position?.start.line ?? -1) ?? headingId(children)} {...props}>{children}</h1>,
            h2: ({ node, children, ...props }) => <h2 id={headingIdsByLine.get(node?.position?.start.line ?? -1) ?? headingId(children)} {...props}>{children}</h2>,
            h3: ({ node, children, ...props }) => <h3 id={headingIdsByLine.get(node?.position?.start.line ?? -1) ?? headingId(children)} {...props}>{children}</h3>,
            h4: ({ node, children, ...props }) => <h4 id={headingIdsByLine.get(node?.position?.start.line ?? -1) ?? headingId(children)} {...props}>{children}</h4>,
          }}
        >
          {body}
        </ReactMarkdown>
      </div>

      <Divider type="line-brown" />

      <div>
        <a
          href="#/blog"
          style={S.backLink}
          onClick={(e) => {
            e.preventDefault()
            onNavigate('/blog')
          }}
        >
          ← 返回博客列表
        </a>
      </div>
    </div>
  )
}

BlogPost.displayName = 'BlogPost'
export default BlogPost
