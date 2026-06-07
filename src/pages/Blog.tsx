import React from 'react'
import { Card, Divider, Collapse } from 'animal-island-ui'
import Title from '../components/Title/Title'
import { getAllPosts } from '../utils/markdown'

interface BlogProps {
  onNavigate: (path: string) => void
}

const TAG_COLOR_MAP: Record<string, string> = {
  '工具实践': 'app-green',
  '技术笔记': 'app-blue',
  '项目日志': 'warm-peach-pink',
  '跨界探索': 'app-orange',
  '随笔杂谈': 'purple',
}

const Blog: React.FC<BlogProps> = ({ onNavigate }) => {
  const posts = getAllPosts()

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', animation: 'fadeInUp 0.5s ease' }}>
      <Title size="large" color="app-yellow">博客</Title>

      <div style={{ marginTop: 24, marginBottom: 28, color: '#7c5734', fontSize: 17, fontWeight: 500 }}>
        技术笔记、工具实践与跨界探索 —— 记录成长的每一步
      </div>

      {/* 文章网格 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 16,
        }}
      >
        {posts.map((post) => (
          <Card
            key={post.slug}
            color={(TAG_COLOR_MAP[post.tag] ?? 'app-blue') as any}
            style={{ cursor: 'pointer' }}
            onClick={() => onNavigate(`/blog/${post.slug}`)}
          >
            <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.7, marginBottom: 12, letterSpacing: 0.5 }}>
              #{post.tag}
            </div>
            <div style={{ fontWeight: 700, fontSize: 19, lineHeight: 1.4, marginBottom: 10 }}>
              {post.title}
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.85, marginBottom: 18 }}>
              {post.excerpt}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14, opacity: 0.75 }}>
              <span>{post.date} · {post.readTime}</span>
              <span style={{ fontWeight: 700 }}>阅读 →</span>
            </div>
          </Card>
        ))}
      </div>

      <Divider type="line-teal" />

      {/* 常见问题 */}
      <div style={{ marginTop: 32 }}>
        <Title size="middle" color="app-teal">关于博客</Title>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Collapse
            question="博客的更新频率？"
            answer="大约每周 1-2 篇。不追热点，只写经过思考、值得分享的内容。"
          />
          <Collapse
            question="文章可以转载吗？"
            answer="非商用请注明出处即可，商用请提前联系。代码示例默认使用 MIT 协议。"
          />
          <Collapse
            question="用了什么技术栈？"
            answer="博客基于 React + Vite + animal-island-ui 构建，部署在 GitHub Pages。"
          />
        </div>
      </div>

    </div>
  )
}

Blog.displayName = 'Blog'
export default Blog
