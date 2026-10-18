import React, { useState, useCallback, useMemo, useEffect, useRef, Suspense } from 'react'
import { Loading } from 'animal-island-ui'
import { useHash } from './hooks/useHash'
import { useIsMobile } from './hooks/useIsMobile'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Resume from './pages/Resume'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import type { HeadingItem } from './utils/markdown'

// 博客相关页面按需加载，避免首页下载 markdown / katex 依赖
const Blog = React.lazy(() => import('./pages/Blog'))
const BlogPost = React.lazy(() => import('./pages/BlogPost'))

interface TocPost {
  title: string
  headings: HeadingItem[]
}

const SITE_NAME = 'Jimmy Liu'

const PAGE_TITLES: Record<string, string> = {
  about: '关于我',
  resume: '简历',
  projects: '项目',
  skills: '技能',
  blog: '博客',
  contact: '联系',
}

const NAV_ITEMS: { key: string; label: string }[] = [
  { key: 'home', label: '首页' },
  { key: 'about', label: '关于我' },
  { key: 'resume', label: '简历' },
  { key: 'projects', label: '项目' },
  { key: 'skills', label: '技能' },
  { key: 'blog', label: '博客' },
  { key: 'contact', label: '联系' },
]

const FONT = "Nunito, 'Noto Sans SC', 'Zen Maru Gothic', -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"

interface TocSidebarProps {
  items: HeadingItem[]
  title: string
  onNavigate: (path: string) => void
}

const TocSidebar: React.FC<TocSidebarProps> = ({ items, title, onNavigate }) => {
  const handleClick = (id: string) => () => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div style={{ padding: '24px 20px', fontFamily: FONT, overflowY: 'auto', height: '100%' }}>
      {/* 目录页也保留站内导航，避免文章页成为“死路” */}
      <nav aria-label="站点导航" style={{ marginBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 6 }}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.key === 'home' ? '#/' : `#/${item.key}`}
              onClick={(e) => {
                e.preventDefault()
                onNavigate(item.key === 'home' ? '/' : `/${item.key}`)
              }}
              style={{
                display: 'block',
                padding: '7px 10px',
                borderRadius: 8,
                background: 'rgba(255,255,255,0.45)',
                color: '#4a4238',
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="#/blog"
          onClick={(e) => {
            e.preventDefault()
            onNavigate('/blog')
          }}
          style={{
            display: 'block',
            marginTop: 8,
            padding: '7px 10px',
            borderRadius: 8,
            background: 'rgba(25,200,185,0.12)',
            color: '#0f7f75',
            fontSize: 13,
            fontWeight: 700,
            textDecoration: 'none',
            textAlign: 'center',
          }}
        >
          ← 返回博客列表
        </a>
      </nav>

      <div style={{ fontSize: 15, fontWeight: 800, color: '#4a4238', marginBottom: 16, lineHeight: 1.4 }}>
        {title}
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#6b5c48', letterSpacing: 1, marginBottom: 12, textTransform: 'uppercase' }}>
        目录
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((item, index) => (
          <button
            key={`${item.id}-${index}`}
            type="button"
            onClick={handleClick(item.id)}
            style={{
              display: 'block',
              width: '100%',
              padding: '6px 12px',
              paddingLeft: 12 + (item.level - 1) * 14,
              fontSize: item.level === 1 ? 14 : 13,
              fontWeight: item.level === 1 ? 700 : 500,
              color: item.level === 1 ? '#4a4238' : '#5f574a',
              textDecoration: 'none',
              border: 'none',
              background: 'none',
              borderRadius: 8,
              lineHeight: 1.5,
              transition: 'background 0.2s',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: FONT,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
          >
            {item.text}
          </button>
        ))}
      </div>
    </div>
  )
}

const NotFound: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => (
  <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', paddingTop: 72, fontFamily: FONT }}>
    <div style={{ fontSize: 56, fontWeight: 900, color: '#4a4238', lineHeight: 1 }}>404</div>
    <p style={{ marginTop: 16, fontSize: 17, color: '#6e6557', fontWeight: 500 }}>
      这个页面不存在，可能是链接写错了。
    </p>
    <button
      type="button"
      onClick={() => onNavigate('/')}
      style={{
        marginTop: 20,
        padding: '10px 24px',
        fontSize: 16,
        fontWeight: 700,
        color: '#fff',
        background: '#0f7f75',
        border: 'none',
        borderRadius: 12,
        cursor: 'pointer',
        fontFamily: FONT,
        boxShadow: '0 3px 0 0 #0a615a',
      }}
    >
      回到首页
    </button>
  </div>
)

const PageFallback: React.FC = () => (
  <div style={{ padding: '48px 24px', textAlign: 'center', color: '#6e6557', fontSize: 15, fontWeight: 600, fontFamily: FONT }}>
    加载中…
  </div>
)

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
      return <NotFound onNavigate={navigate} />
  }
}

const App: React.FC = () => {
  const { hash, navigate } = useHash()
  const isMobile = useIsMobile()
  const [loadingActive, setLoadingActive] = useState(false)
  const [loadingMounted, setLoadingMounted] = useState(false)
  const loadingTimers = useRef<number[]>([])

  // 兼容 #about / #/about/# 这类写法，未知路由不再静默落到 About
  const normalizedHash = hash === '' ? '/' : hash
  const rawPath = normalizedHash.replace(/^\/+/, '').replace(/\/+$/, '')
  const isBlogPost = rawPath.startsWith('blog/') && rawPath.length > 5
  const activeKey = isBlogPost ? 'blog' : (rawPath || 'home')
  const blogSlug = isBlogPost ? rawPath.slice(5) : ''
  const isHomePage = activeKey === 'home'

  const [tocPost, setTocPost] = useState<TocPost | null>(null)

  // 动态加载博客正文，避免首页主包带上 markdown/katex
  useEffect(() => {
    if (!isBlogPost || !blogSlug) {
      setTocPost(null)
      return
    }
    let cancelled = false
    void import('./utils/markdown')
      .then((mod) => {
        if (cancelled) return
        const post = mod.getPostBySlug(blogSlug)
        setTocPost(
          post
            ? { title: post.frontmatter.title, headings: mod.extractHeadings(post.body) }
            : null
        )
      })
      .catch(() => {
        if (!cancelled) setTocPost(null)
      })
    return () => {
      cancelled = true
    }
  }, [isBlogPost, blogSlug])

  const sidebarContent = useMemo(() => {
    if (!tocPost || tocPost.headings.length === 0) return undefined
    return <TocSidebar items={tocPost.headings} title={tocPost.title} onNavigate={navigate} />
  }, [tocPost, navigate])

  // 每个路由设置独立的浏览器标题
  useEffect(() => {
    if (isHomePage) {
      document.title = `${SITE_NAME} · 个人网站`
      return
    }
    const pageTitle = isBlogPost ? (tocPost?.title ?? '博客') : (PAGE_TITLES[activeKey] ?? '页面')
    document.title = `${pageTitle} · ${SITE_NAME}`
  }, [isHomePage, isBlogPost, tocPost, activeKey])

  useEffect(() => {
    const timers = loadingTimers
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  const handleHomeNavigate = useCallback(
    (path: string) => {
      loadingTimers.current.forEach((id) => window.clearTimeout(id))
      setLoadingMounted(true)
      setLoadingActive(true)
      navigate(path)
      // 只做很短的转场，不再长时间遮挡点击
      loadingTimers.current = [
        window.setTimeout(() => setLoadingActive(false), 350),
        window.setTimeout(() => setLoadingMounted(false), 900),
      ]
    },
    [navigate]
  )

  return (
    <>
      {isHomePage ? (
        <Home onNavigate={handleHomeNavigate} />
      ) : (
        <Layout activeKey={activeKey} onNavigate={navigate} isMobile={isMobile} sidebarContent={sidebarContent}>
          <Suspense fallback={<PageFallback />}>
            {renderPage(activeKey, blogSlug, navigate)}
          </Suspense>
        </Layout>
      )}

      {/* Loading transition overlay */}
      {loadingMounted && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          <Loading active={loadingActive} />
        </div>
      )}
    </>
  )
}

export default App
