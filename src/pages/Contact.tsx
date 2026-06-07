import React, { useState } from 'react'
import { Input, Button, Card, Divider, Collapse } from 'animal-island-ui'
import Title from '../components/Title/Title'

const Contact: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    if (!name || !email || !message) return
    const subject = encodeURIComponent(`[网站留言] 来自 ${name}`)
    const body = encodeURIComponent(`姓名：${name}\n邮箱：${email}\n\n${message}`)
    window.open(`mailto:mvez14@163.com?subject=${subject}&body=${body}`)
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', animation: 'fadeInUp 0.5s ease' }}>
      <Title size="large" color="app-pink">联系我</Title>

      <div style={{ marginTop: 24, marginBottom: 24, color: '#7c5734', fontSize: 17, fontWeight: 500 }}>
        有任何问题或想法，欢迎通过邮箱或下方留言联系我。
      </div>

      <Divider type="line-teal" />

      {/* 常见问题 */}
      <div style={{ marginTop: 32 }}>
        <Title size="middle" color="app-teal">常见问题</Title>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Collapse
            question="你的研究方向是什么？"
            answer="我的核心方向为信号链与混合信号IC，以及电力电子技术。学术成果发表于 TPE Letters（JCR Q1）。"
          />
          <Collapse
            question="你擅长哪些 EDA 工具？"
            answer="精通 Cadence Virtuoso、Multisim、SIMetrix-Simplis 等电路仿真工具，以及 Cadence Allegro、Altium Designer 等 PCB 设计工具。"
          />
          <Collapse
            question="如何联系你？"
            answer="可以通过侧边栏的邮箱链接联系我，也可以在下方留言。如需获取完整版 PDF 简历，欢迎发送邮件，我将在第一时间回复。"
          />
        </div>
      </div>

      <Divider type="line-yellow" />

      {/* 留言表单 */}
      <div style={{ marginTop: 32 }}>
        <Title size="middle" color="app-yellow">给我留言</Title>
        <Card style={{ padding: '28px 24px', marginTop: 16, background: 'rgb(247, 243, 223)', border: '2px solid #9f927d', borderRadius: 18 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 600, color: '#725d42', marginBottom: 8 }}>名字</div>
              <Input
                placeholder="你的名字"
                size="large"
                value={name}
                onChange={(e) => setName(e.target.value)}
                allowClear
              />
            </div>

            <div>
              <div style={{ fontSize: 17, fontWeight: 600, color: '#725d42', marginBottom: 8 }}>邮箱</div>
              <Input
                placeholder="your@email.com"
                size="large"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                allowClear
              />
            </div>

            <div>
              <div style={{ fontSize: 17, fontWeight: 600, color: '#725d42', marginBottom: 8 }}>留言</div>
              <textarea
                placeholder="想说的话..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: 120,
                  padding: '12px 18px',
                  fontSize: 16,
                  fontFamily: "Nunito, 'Noto Sans SC', 'Zen Maru Gothic', -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
                  fontWeight: 500,
                  color: '#725d42',
                  background: 'rgb(247, 243, 223)',
                  border: '2.5px solid #c4b89e',
                  borderRadius: 50,
                  outline: 'none',
                  resize: 'vertical',
                  letterSpacing: '0.01em',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 3px 0 0 #d4c9b4',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#ffcc00'
                  e.target.style.boxShadow = '0 3px 0 0 #e0b800, 0 0 0 3px rgba(255, 204, 0, 0.15)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#c4b89e'
                  e.target.style.boxShadow = '0 3px 0 0 #d4c9b4'
                }}
              />
            </div>

            <Button
              type="primary"
              size="large"
              block
              onClick={handleSubmit}
              disabled={!name || !email || !message}
            >
              发送留言
            </Button>

            <div style={{ fontSize: 14, color: '#8a7b66', textAlign: 'center' }}>
              点击后会打开你的邮件客户端，留言将发送到我的邮箱
            </div>
          </div>
        </Card>
      </div>

    </div>
  )
}

Contact.displayName = 'Contact'
export default Contact
