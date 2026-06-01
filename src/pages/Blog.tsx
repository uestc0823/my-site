import React from 'react'
import { Card, Divider, Collapse } from 'animal-island-ui'
import Title from '../components/Title/Title'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  tag: string
  color: string
  readTime: string
}

const POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'GaN 功率器件在电机驱动中的应用思考',
    excerpt: '第三代宽禁带半导体 GaN 器件在 BLDC 驱动系统中的非线性开关特性分析与建模经验总结。',
    date: '2025-12',
    tag: '电路设计',
    color: 'app-blue',
    readTime: '8分钟',
  },
  {
    id: '2',
    title: '从 MATLAB 到 Python：工程数据处理工作流演进',
    excerpt: '如何将实验室仪器产生的海量高频波形数据，通过自动化脚本实现高效清洗与特征提取。',
    date: '2025-09',
    tag: '工具实践',
    color: 'app-green',
    readTime: '6分钟',
  },
  {
    id: '3',
    title: 'AI 辅助硬件开发的初步实践',
    excerpt: '将生成式 AI 引入工程开发流程，利用大语言模型辅助代码编写、文档生成与方案分析的实践心得。',
    date: '2025-07',
    tag: '跨界探索',
    color: 'app-orange',
    readTime: '7分钟',
  },
  {
    id: '4',
    title: '信号链 IC 设计入门笔记',
    excerpt: '信号链与混合信号 IC 的基础知识梳理，包括 ADC/DAC 架构、运放设计要点等。',
    date: '2024-11',
    tag: '学习记录',
    color: 'purple',
    readTime: '10分钟',
  },
  {
    id: '5',
    title: '全国大学生数学竞赛参赛回顾',
    excerpt: '第十三届全国大学生数学竞赛决赛二等奖的备赛历程与经验分享。',
    date: '2023-06',
    tag: '竞赛经历',
    color: 'app-yellow',
    readTime: '5分钟',
  },
  {
    id: '6',
    title: '动森风格个人网站开发手记',
    excerpt: '基于 animal-island-ui 组件库，用 React + TypeScript 构建动森风格个人网站的开发过程与设计思考。',
    date: '2026-06',
    tag: '项目日志',
    color: 'warm-peach-pink',
    readTime: '6分钟',
  },
]

const Blog: React.FC = () => {
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
        {POSTS.map((post) => (
          <Card
            key={post.id}
            color={post.color as any}
            style={{ cursor: 'pointer', padding: '22px 18px', transition: 'transform 0.2s ease' }}
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
