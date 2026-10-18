import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'animal-island-ui/style'
import './styles/global.less'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

const FONT =
  "Nunito, 'Noto Sans SC', 'Zen Maru Gothic', -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"

const S: Record<'overlay' | 'card' | 'title' | 'text' | 'button', React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    background: '#F7F1E5',
    fontFamily: FONT,
  },
  card: {
    maxWidth: 420,
    width: '100%',
    padding: '32px 28px',
    background: '#EAE2CD',
    border: '2px solid #9f927d',
    borderRadius: 18,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 800,
    color: '#4a4238',
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    lineHeight: 1.7,
    color: '#6e6557',
    fontWeight: 500,
    marginBottom: 24,
  },
  button: {
    padding: '10px 28px',
    fontSize: 16,
    fontWeight: 700,
    color: '#fff',
    background: '#0f7f75',
    border: 'none',
    borderRadius: 14,
    cursor: 'pointer',
    boxShadow: '0 3px 0 0 #0a615a',
  },
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('[ErrorBoundary]', error, errorInfo)
  }

  handleReload = (): void => {
    window.location.reload()
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div style={S.overlay}>
          <div style={S.card}>
            <div style={S.title}>页面出了点问题</div>
            <div style={S.text}>
              抱歉，页面在渲染时遇到了错误。请刷新页面试试；如果问题仍然存在，稍后再来访问。
            </div>
            <button type="button" style={S.button} onClick={this.handleReload}>
              刷新页面
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
