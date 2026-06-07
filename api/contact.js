// Vercel Serverless Function — GitHub Issues API
// Token 存在 Vercel 环境变量中，不会暴露给前端

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: '请填写所有字段' })
  }

  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return res.status(400).json({ error: '内容过长' })
  }

  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return res.status(500).json({ error: '服务未配置' })
  }

  try {
    const response = await fetch(
      'https://api.github.com/repos/uestc0823/blog-messages/issues',
      {
        method: 'POST',
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'my-site-contact-form',
        },
        body: JSON.stringify({
          title: `[留言] ${name}`,
          body: `**姓名：** ${name}\n**邮箱：** ${email}\n\n---\n\n${message}`,
          labels: ['留言'],
        }),
      }
    )

    if (!response.ok) {
      const err = await response.text()
      console.error('GitHub API error:', err)
      return res.status(502).json({ error: '提交失败，请稍后再试' })
    }

    return res.status(200).json({ success: true })
  } catch (e) {
    console.error('Server error:', e)
    return res.status(500).json({ error: '服务器错误' })
  }
}
