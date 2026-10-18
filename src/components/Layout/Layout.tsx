import React, { useState, useEffect, useRef } from 'react'
import Sidebar from '../Sidebar/Sidebar'

interface LayoutProps {
  activeKey: string
  onNavigate: (path: string) => void
  isMobile: boolean
  children: React.ReactNode
  sidebarContent?: React.ReactNode
}

const S = {
  layout: {
    display: 'flex',
    height: '100dvh',
    overflow: 'hidden',
    fontFamily: "Nunito, 'Noto Sans SC', 'Zen Maru Gothic', -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
    background: '#F7F1E5',
  } as React.CSSProperties,
  sidebar: {
    width: 300,
    minWidth: 300,
    background: '#EAE2CD',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  } as React.CSSProperties,
  main: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch',
    position: 'relative',
    zIndex: 1,
  } as React.CSSProperties,
  mobileTopBar: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    height: 52,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 12px',
    background: 'rgba(255,252,244,0.92)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid #e8e2d6',
    zIndex: 50,
    fontFamily: "Nunito, 'Noto Sans SC', 'Zen Maru Gothic', -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
  } as React.CSSProperties,
  mobileBtn: {
    background: 'none',
    border: 'none',
    fontSize: 20,
    color: '#725d42',
    padding: '4px 8px',
    borderRadius: 8,
    lineHeight: 1,
    cursor: 'pointer',
  } as React.CSSProperties,
  mobileTitle: {
    fontWeight: 700,
    fontSize: 15,
    color: '#725d42',
  } as React.CSSProperties,
  drawer: {
    position: 'fixed' as const,
    left: 0,
    top: 0,
    bottom: 0,
    width: 240,
    background: `url('assets/img/menu_bg.svg') center/cover no-repeat`,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 99,
    boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
  } as React.CSSProperties,
  overlay: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0,0,0,0.35)',
    zIndex: 98,
  } as React.CSSProperties,
  decoImage: {
    position: 'fixed' as const,
    left: 300,
    right: 0,
    bottom: 0,
    width: 'calc(100% - 300px)',
    pointerEvents: 'none',
    zIndex: 0,
  } as React.CSSProperties,
}

const PAGE_TITLES: Record<string, string> = {
  about: '关于我',
  resume: '简历',
  projects: '项目',
  skills: '技能',
  blog: '博客',
  contact: '联系',
}

const Layout: React.FC<LayoutProps> = ({ activeKey, onNavigate, isMobile, children, sidebarContent }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const mainRef = useRef<HTMLElement>(null)
  const drawerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isMobile) setDrawerOpen(false)
  }, [isMobile])

  useEffect(() => {
    setDrawerOpen(false)
    mainRef.current?.scrollTo({ top: 0 })
  }, [activeKey])

  // 抽屉打开时：Esc 关闭、Tab 焦点循环、关闭后把焦点还给触发按钮
  useEffect(() => {
    if (!drawerOpen) return
    const drawer = drawerRef.current
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const focusables = drawer
      ? Array.from(drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
      : []
    focusables[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false)
        return
      }
      if (e.key !== 'Tab' || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (previouslyFocused && document.contains(previouslyFocused)) previouslyFocused.focus()
      else menuButtonRef.current?.focus()
    }
  }, [drawerOpen])

  // Drawer holds both anchors (site nav) and buttons (in-article TOC entries):
  // any interactive item closes it so the mobile user immediately sees the result.
  const closeDrawerIfInteractive = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    if (target.closest('a, button')) setDrawerOpen(false)
  }

  return (
    <div style={S.layout}>
      {/* Desktop sidebar */}
      {!isMobile && (
        <aside style={S.sidebar}>
          {sidebarContent ?? <Sidebar activeKey={activeKey} onNavigate={onNavigate} />}
        </aside>
      )}

      {/* Mobile top bar */}
      {isMobile && (
        <div style={S.mobileTopBar}>
          <button style={S.mobileBtn} aria-label="返回首页" onClick={() => onNavigate('/')}>
            ←
          </button>
          <span style={S.mobileTitle}>
            {PAGE_TITLES[activeKey] ?? '页面'}
          </span>
          <button ref={menuButtonRef} style={S.mobileBtn} aria-label="打开菜单" onClick={() => setDrawerOpen(true)}>
            ☰
          </button>
        </div>
      )}

      {/* Mobile drawer */}
      {isMobile && drawerOpen && (
        <>
          <div style={S.overlay} onClick={() => setDrawerOpen(false)} />
          <aside
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="站点菜单"
            style={S.drawer}
            onClick={closeDrawerIfInteractive}
          >
            {sidebarContent ?? <Sidebar activeKey={activeKey} onNavigate={onNavigate} />}
          </aside>
        </>
      )}

      {/* Main content */}
      <main
        ref={mainRef}
        style={{
          ...S.main,
          padding: isMobile ? '16px' : '32px 40px',
          paddingTop: isMobile ? 68 : 32,
        }}
      >
        {children}
      </main>

      {/* Decorative bottom image (desktop only) */}
      {!isMobile && (
        <img
          src="./assets/img/guide-bg-line.webp"
          alt=""
          loading="lazy"
          style={S.decoImage}
        />
      )}
    </div>
  )
}

Layout.displayName = 'Layout'
export default Layout
