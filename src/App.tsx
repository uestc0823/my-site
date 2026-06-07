import React, { useState, useCallback } from 'react'
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
        <Layout activeKey={activeKey} onNavigate={navigate} isMobile={isMobile}>
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
