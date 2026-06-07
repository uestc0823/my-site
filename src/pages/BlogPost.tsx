import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Divider, CodeBlock } from 'animal-island-ui'
import Title from '../components/Title/Title'
import { getPostBySlug } from '../utils/markdown'
import styles from '../styles/blogPost.module.less'

interface BlogPostProps {
  slug: string
  onNavigate: (path: string) => void
}

const TAG_COLOR_MAP: Record<string, string> = {
  '电路设计': 'app-blue',
  '工具实践': 'app-green',
  '跨界探索': 'app-orange',
  '学习记录': 'purple',
  '竞赛经历': 'app-yellow',
  '项目日志': 'warm-peach-pink',
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
    marginTop: 12,
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
    color: '#19c8b9',
    fontWeight: 700,
    fontSize: 16,
    cursor: 'pointer',
    marginTop: 24,
    transition: 'opacity 0.2s',
  } as React.CSSProperties,
  notFound: {
    maxWidth: 800,
    margin: '0 auto',
    textAlign: 'center' as const,
    paddingTop: 80,
    fontFamily: FONT_FAMILY,
  } as React.CSSProperties,
  notFoundTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: '#4a4238',
    marginBottom: 12,
  } as React.CSSProperties,
  notFoundText: {
    fontSize: 17,
    color: '#6e6557',
    marginBottom: 24,
  } as React.CSSProperties,
}

const TAG_PILL_COLORS: Record<string, string> = {
  '电路设计': '#5B8DEF',
  '工具实践': '#5AC28C',
  '跨界探索': '#E8854D',
  '学习记录': '#9B6DD7',
  '竞赛经历': '#E5B94E',
  '项目日志': '#E89AAB',
}

const BlogPost: React.FC<BlogPostProps> = ({ slug, onNavigate }) => {
  const post = getPostBySlug(slug)

  useEffect(() => {
    const main = document.querySelector('main')
    if (main) main.scrollTo({ top: 0 })
  }, [slug])

  if (!post) {
    return (
      <div style={S.notFound}>
        <div style={S.notFoundTitle}>文章未找到</div>
        <div style={S.notFoundText}>抱歉，您访问的文章不存在。</div>
        <div style={S.backLink} onClick={() => onNavigate('blog')}>
          返回博客列表
        </div>
      </div>
    )
  }

  const { frontmatter, body } = post
  const tagColor = TAG_COLOR_MAP[frontmatter.tag] ?? 'app-blue'
  const pillColor = TAG_PILL_COLORS[frontmatter.tag] ?? '#5B8DEF'

  return (
    <div style={S.container}>
      <Title size="large" color={tagColor as any}>{frontmatter.title}</Title>

      <div style={S.metaBar}>
        <span style={{ ...S.tagPill, background: pillColor }}>#{frontmatter.tag}</span>
        <span>{frontmatter.date}</span>
        <span>·</span>
        <span>{frontmatter.readTime}</span>
      </div>

      {frontmatter.cover && (
        <img src={frontmatter.cover} alt={frontmatter.title} style={S.coverImage} />
      )}

      <Divider type="line-teal" />

      <div className={styles.content}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            pre({ children, ...props }) {
              try {
                const codeEl = React.Children.toArray(children).find(
                  (child) => React.isValidElement(child) && (child as React.ReactElement).type === 'code'
                ) as React.ReactElement<{ children?: React.ReactNode }> | undefined
                if (codeEl?.props?.children) {
                  const codeString = String(codeEl.props.children).replace(/\n$/, '')
                  return <CodeBlock code={codeString} />
                }
              } catch {
                // fallback to default pre rendering
              }
              return <pre {...props}>{children}</pre>
            },
          }}
        >
          {body}
        </ReactMarkdown>
      </div>

      <Divider type="line-brown" />

      <div style={S.backLink} onClick={() => onNavigate('blog')}>
        返回博客列表
      </div>
    </div>
  )
}

BlogPost.displayName = 'BlogPost'
export default BlogPost
