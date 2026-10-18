import React, { useState } from 'react'
import { Input, Button, Card, Divider, Collapse } from 'animal-island-ui'
import Title from '../components/Title/Title'

// 联系方式接口：优先读环境变量，避免把生产地址写死在前端代码里
const CONTACT_API =
  (import.meta.env.VITE_CONTACT_API as string | undefined) ??
  'https://my-site-eight-woad.vercel.app/api/contact'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FONT = "Nunito, 'Noto Sans SC', 'Zen Maru Gothic', -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 17,
  fontWeight: 600,
  color: '#725d42',
  marginBottom: 8,
}

const errorStyle: React.CSSProperties = {
  padding: '10px 16px',
  borderRadius: 12,
  fontSize: 15,
  fontWeight: 600,
  color: '#a03030',
  background: 'rgba(160, 48, 48, 0.1)',
  border: '1.5px solid rgba(160, 48, 48, 0.2)',
}

const Contact: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  // 蜜罐字段：正常用户看不到也不会填，机器人通常会填
  const [website, setWebsite] = useState('')
  const [sending, setSending] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [result, setResult] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const validate = (): string | null => {
    if (!name.trim()) return '请填写名字。'
    if (!EMAIL_RE.test(email.trim())) return '请输入有效的邮箱地址。'
    if (!message.trim()) return '请填写留言内容。'
    return null
  }

  const handleSubmit = async () => {
    if (sending) return

    if (website) {
      // 蜜罐被填写：按垃圾留言静默处理，不请求接口
      setResult({ type: 'success', text: '留言已发送！我会尽快回复你。' })
      return
    }

    const invalid = validate()
    setValidationError(invalid)
    if (invalid) {
      setResult(null)
      return
    }

    setSending(true)
    setResult(null)

    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), 12000)

    try {
      const res = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
        signal: controller.signal,
      })

      const raw = await res.text()
      let data: { error?: string } = {}
      try {
        data = raw ? (JSON.parse(raw) as { error?: string }) : {}
      } catch {
        // 接口返回的不是 JSON（例如网关错误页），按状态码兜底
      }

      if (res.ok) {
        setResult({ type: 'success', text: '留言已发送！我会尽快回复你。' })
        setName('')
        setEmail('')
        setMessage('')
        setWebsite('')
      } else {
        setResult({ type: 'error', text: data.error ?? `发送失败（${res.status}），请稍后再试。` })
      }
    } catch (err) {
      const aborted = err instanceof DOMException && err.name === 'AbortError'
      setResult({
        type: 'error',
        text: aborted ? '请求超时，请检查网络后重试。' : '网络错误，请稍后再试。',
      })
    } finally {
      window.clearTimeout(timeoutId)
      setSending(false)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', animation: 'fadeInUp 0.5s ease' }}>
      <Title size="large" color="app-pink">联系我</Title>

      <div style={{ marginTop: 24, marginBottom: 24, color: '#7c5734', fontSize: 17, fontWeight: 500 }}>
        有任何问题或想法，欢迎通过邮箱或下方留言联系我。
      </div>

      <Divider type="line-teal" />

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

      <div style={{ marginTop: 32 }}>
        <Title size="middle" color="app-yellow">给我留言</Title>
        <Card style={{ padding: '28px 24px', marginTop: 16, background: 'rgb(247, 243, 223)', border: '2px solid #9f927d', borderRadius: 18 }}>
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              void handleSubmit()
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div aria-hidden="true" style={{ position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' }}>
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="contact-name" style={labelStyle}>名字</label>
                <Input
                  id="contact-name"
                  name="name"
                  placeholder="你的名字"
                  size="large"
                  value={name}
                  maxLength={40}
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                  allowClear
                />
              </div>

              <div>
                <label htmlFor="contact-email" style={labelStyle}>邮箱</label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  placeholder="your@email.com"
                  size="large"
                  value={email}
                  maxLength={100}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  allowClear
                />
              </div>

              <div>
                <label htmlFor="contact-message" style={labelStyle}>留言</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="想说的话..."
                  value={message}
                  maxLength={2000}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: 120,
                    padding: '12px 18px',
                    fontSize: 16,
                    fontFamily: FONT,
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

              {validationError && (
                <div role="alert" style={errorStyle}>
                  {validationError}
                </div>
              )}

              {result && (
                <div
                  role={result.type === 'error' ? 'alert' : 'status'}
                  aria-live="polite"
                  style={{
                    padding: '10px 16px',
                    borderRadius: 12,
                    fontSize: 15,
                    fontWeight: 600,
                    color: result.type === 'success' ? '#2a7d4f' : '#a03030',
                    background: result.type === 'success' ? 'rgba(42, 125, 79, 0.1)' : 'rgba(160, 48, 48, 0.1)',
                    border: `1.5px solid ${result.type === 'success' ? 'rgba(42, 125, 79, 0.2)' : 'rgba(160, 48, 48, 0.2)'}`,
                  }}
                >
                  {result.text}
                </div>
              )}

              <Button
                type="primary"
                size="large"
                block
                htmlType="submit"
                loading={sending}
                disabled={sending}
              >
                {sending ? '发送中...' : '发送留言'}
              </Button>
            </div>
          </form>
        </Card>
      </div>

    </div>
  )
}

Contact.displayName = 'Contact'
export default Contact
