import React from 'react'

interface MenuItem {
  key: string
  label: string
}

const MENU_ITEMS: MenuItem[] = [
  { key: 'about', label: '关于我' },
  { key: 'resume', label: '简历' },
  { key: 'projects', label: '项目' },
  { key: 'skills', label: '技能' },
  { key: 'blog', label: '博客' },
  { key: 'contact', label: '联系' },
  { key: 'home', label: '返回首页' },
]

interface SidebarProps {
  activeKey: string
  onNavigate: (path: string) => void
}

const S = {
  header: {
    padding: '20px 16px 12px',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer',
  } as React.CSSProperties,
  avatar: {
    width: 72,
    height: 72,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #19c8b9, #889df0)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    fontWeight: 800,
    color: '#fff',
    letterSpacing: 1,
  } as React.CSSProperties,
  name: {
    fontWeight: 700,
    fontSize: 20,
    color: '#6b5c48',
    letterSpacing: 0.5,
  } as React.CSSProperties,
  title: {
    fontSize: 14,
    color: '#8a7b66',
    fontWeight: 500,
    textAlign: 'center',
    lineHeight: 1.4,
  } as React.CSSProperties,
  contactList: {
    padding: '12px 16px',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  } as React.CSSProperties,
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 14,
    color: '#6b5c48',
    fontWeight: 500,
  } as React.CSSProperties,
  contactIcon: {
    fontSize: 15,
    width: 18,
    textAlign: 'center',
    flexShrink: 0,
  } as React.CSSProperties,
  contactLink: {
    color: '#19c8b9',
    textDecoration: 'none',
    fontWeight: 600,
  } as React.CSSProperties,
  socialRow: {
    padding: '10px 16px',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
  } as React.CSSProperties,
  socialBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: '#725d42',
    color: '#fff',
    fontSize: 13,
    fontWeight: 700,
    textDecoration: 'none',
    boxShadow: '0 2px 0 0 #bdaea0',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  } as React.CSSProperties,
  menuList: {
    flex: 1,
    overflow: 'auto',
    padding: '8px 0',
  } as React.CSSProperties,
  menuItem: (active: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    margin: '1px 5px',
    height: 40,
    padding: '0 16px',
    paddingLeft: 26,
    fontWeight: 600,
    fontSize: 16,
    color: active ? '#fff' : '#8a7b66',
    background: active ? '#B7C6E5' : 'transparent',
    borderRadius: 12,
    transition: 'all 0.15s',
    cursor: 'pointer',
  }),
}

const Sidebar: React.FC<SidebarProps> = ({ activeKey, onNavigate }) => {
  return (
    <>
      {/* 个人信息 */}
      <div style={S.header} onClick={() => onNavigate('/')}>
        <div style={S.avatar}>JL</div>
        <div style={S.name}>刘枭</div>
        <div style={S.title}>纳芯微电子 · 应用工程师</div>
      </div>

      {/* 联系方式 */}
      <div style={S.contactList}>
        <div style={S.contactItem}>
          <span style={S.contactIcon}>📧</span>
          <a href="mailto:13871193033@163.com" style={S.contactLink}>13871193033@163.com</a>
        </div>
        <div style={S.contactItem}>
          <span style={S.contactIcon}>📱</span>
          <a href="tel:13871193033" style={S.contactLink}>138-7119-3033</a>
        </div>
        <div style={S.contactItem}>
          <span style={S.contactIcon}>📍</span>
          <span>湖北省武汉市</span>
        </div>
        <div style={S.contactItem}>
          <span style={S.contactIcon}>🎂</span>
          <span>2001.08.24</span>
        </div>
      </div>

      {/* 社交链接 */}
      <div style={S.socialRow}>
        <a
          href="https://github.com/LiuXiao200311"
          target="_blank"
          rel="noopener noreferrer"
          style={S.socialBtn}
          title="GitHub"
        >
          G
        </a>
        <a
          href="https://gitee.com/LiuXiao-200311"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...S.socialBtn, background: '#e05a5a', boxShadow: '0 2px 0 0 #c94444' }}
          title="Gitee"
        >
          Gi
        </a>
      </div>

      {/* 导航菜单 */}
      <nav style={S.menuList}>
        {MENU_ITEMS.map((item) => (
          <div
            key={item.key}
            style={S.menuItem(activeKey === item.key)}
            onClick={() => onNavigate(item.key === 'home' ? '/' : `/${item.key}`)}
            onMouseEnter={(e) => {
              if (activeKey !== item.key)
                e.currentTarget.style.background = '#d6dff0'
            }}
            onMouseLeave={(e) => {
              if (activeKey !== item.key)
                e.currentTarget.style.background = 'transparent'
            }}
          >
            {item.label}
          </div>
        ))}
      </nav>
    </>
  )
}

Sidebar.displayName = 'Sidebar'
export default Sidebar
