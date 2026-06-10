import React, { useState, useCallback, useMemo } from 'react'
import { Loading } from 'animal-island-ui'
import { useHash } from './hooks/useHash'
import { useIsMobile } from './hooks/useIsMobile'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Resume from './pages/Resume'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import { getPostBySlug } from './utils/markdown'

interface TocItem {
  id: string
  text: string
  level: number
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w一-鿿\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function extractHeadings(markdown: string): TocItem[] {
  const items: TocItem[] = []
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  let inCodeBlock = false
  for (const line of lines) {
    if (line.trimStart().startsWith('```')) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue
    const match = line.match(/^(#{1,3})\s+(.+)$/)
    if (match) {
      const text = match[2].replace(/\*\*/g, '').trim()
      items.push({
        id: slugifyHeading(text),
        text,
        level: match[1].length,
      })
    }
  }
  return items
}

const FONT = "Nunito, 'Noto Sans SC', 'Zen Maru Gothic', -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"

const TocSidebar: React.FC<{ items: TocItem[]; title: string }> = ({ items, title }) => {
  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div style={{ padding: '24px 20px', fontFamily: FONT, overflowY: 'auto', height: '100%' }}>
      <div style={{ fontSize: 15, fontWeight: 800, color: '#4a4238', marginBottom: 16, lineHeight: 1.4 }}>
        {title}
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#8a7b66', letterSpacing: 1, marginBottom: 12, textTransform: 'uppercase' }}>
        目录
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={handleClick(item.id)}
            style={{
              display: 'block',
              padding: '6px 12px',
              paddingLeft: 12 + (item.level - 1) * 14,
              fontSize: item.level === 1 ? 14 : 13,
              fontWeight: item.level === 1 ? 700 : 500,
              color: item.level === 1 ? '#4a4238' : '#6e6557',
              textDecoration: 'none',
              borderRadius: 8,
              lineHeight: 1.5,
              transition: 'background 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.background = 'rgba(0,0,0,0.05)' }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'none' }}
          >
            {item.text}
          </a>
        ))}
      </div>
    </div>
  )
}

function renderPage(key: string, blogSlug: string, navigate: (path: string) => void): React.ReactNode {
  if (key === 'blog' && blogSlug) {
    return <BlogPost slug={blogSlug} onNavigate={navigate} />
  }
  switch (key) {
    case 'about':
      return <About />
    case 'resume':
      return <Resume />
    case 'projects':
      return <Projects />
    case 'skills':
      return <Skills />
    case 'blog':
      return <Blog onNavigate={navigate} />
    case 'contact':
      return <Contact />
    default:
      return <About />
  }
}

const App: React.FC = () => {
  const { hash, navigate } = useHash()
  const isMobile = useIsMobile()
  const [loadingActive, setLoadingActive] = useState(false)
  const [loadingMounted, setLoadingMounted] = useState(false)

  const rawPath = hash === '/' || hash === '' ? '' : hash.slice(1)
  const isBlogPost = rawPath.startsWith('blog/') && rawPath.length > 5
  const activeKey = isBlogPost ? 'blog' : (rawPath || 'home')
  const blogSlug = isBlogPost ? rawPath.slice(5) : ''
  const isHomePage = activeKey === 'home'

  const tocData = useMemo(() => {
    if (!isBlogPost || !blogSlug) return null
    const post = getPostBySlug(blogSlug)
    if (!post) return null
    return extractHeadings(post.body)
  }, [isBlogPost, blogSlug])

  const sidebarContent = useMemo(() => {
    if (!tocData || tocData.length === 0) return undefined
    const post = getPostBySlug(blogSlug)
    return <TocSidebar items={tocData} title={post?.frontmatter.title ?? ''} />
  }, [tocData, blogSlug])

  const handleHomeNavigate = useCallback(
    (path: string) => {
      setLoadingMounted(true)
      setLoadingActive(true)
      navigate(path)
      setTimeout(() => setLoadingActive(false), 2000)
      setTimeout(() => setLoadingMounted(false), 3500)
    },
    [navigate]
  )

  return (
    <>
      {isHomePage ? (
        <Home onNavigate={handleHomeNavigate} />
      ) : (
        <Layout activeKey={activeKey} onNavigate={navigate} isMobile={isMobile} sidebarContent={sidebarContent}>
          {renderPage(activeKey, blogSlug, navigate)}
        </Layout>
      )}

      {/* Loading transition overlay */}
      {loadingMounted && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            pointerEvents: loadingActive ? 'auto' : 'none',
          }}
        >
          <Loading active={loadingActive} />
        </div>
      )}
    </>
  )
}

export default App
