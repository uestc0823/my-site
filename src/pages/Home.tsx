import React from 'react'
import { Typewriter, Footer } from 'animal-island-ui'
import NookPhoneNav from '../components/NookPhoneNav/NookPhoneNav'
import type { NookPhoneApp } from '../components/NookPhoneNav/NookPhoneNav'
import { useIsMobile } from '../hooks/useIsMobile'

const APPS: NookPhoneApp[] = [
  { id: 'about', label: '关于我', color: '#889DF0', iconClass: 'iconChat', route: '/about', iconUrl: '/assets/img/nook-phone/Aboutme.png' },
  { id: 'resume', label: '简历', color: '#E59266', iconClass: 'iconMiles', route: '/resume', iconUrl: '/assets/img/nook-phone/Resume.png' },
  { id: 'projects', label: '项目', color: '#B77DEE', iconClass: 'iconDesign', route: '/projects', iconUrl: '/assets/img/nook-phone/Project.png' },
  { id: 'skills', label: '技能', color: '#82D5BB', iconClass: 'iconDiy', route: '/skills', iconUrl: '/assets/img/nook-phone/Skills.png' },
  { id: 'blog', label: '博客', color: '#F7CD67', iconClass: 'iconCritterpedia', route: '/blog', iconUrl: '/assets/img/nook-phone/Blogs.png' },
  { id: 'contact', label: '联系', color: '#F8A6B2', iconClass: 'iconChat', route: '/contact', iconUrl: '/assets/img/nook-phone/contact.png' },
]

interface HomeProps {
  onNavigate: (path: string) => void
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const isMobile = useIsMobile()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        background: `url('/assets/img/home_bg.webp') 0 0 / auto repeat, #7DC395`,
        animation: 'bgScroll 80s linear infinite',
        fontFamily: "Nunito, 'Noto Sans SC', 'Zen Maru Gothic', -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
        padding: isMobile ? '0 16px' : '0',
      }}
    >
      {/* Welcome text */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: 12,
          padding: '0 20px',
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? 32 : 46,
            fontWeight: 800,
            color: '#FFF9E6',
            textShadow: '0px 4px 1px rgba(0,0,0,0.4)',
            marginBottom: 6,
            letterSpacing: 1,
          }}
        >
          Jimmy Liu的个人网站
        </h1>
        <div
          style={{
            fontSize: isMobile ? 15 : 19,
            color: 'rgba(255,255,255,0.85)',
            fontWeight: 600,
            letterSpacing: 0.5,
          }}
        >
          <Typewriter speed={60} trigger="home-welcome">
            <span>一个热衷于探索新技术的半导体行业从业者</span>
          </Typewriter>
        </div>
      </div>

      {/* NookPhone Navigation */}
      <NookPhoneNav
        apps={APPS}
        onNavigate={onNavigate}
        welcomeText="Welcome!"
      />

      <Footer type="sea" />
    </div>
  )
}

Home.displayName = 'Home'
export default Home
