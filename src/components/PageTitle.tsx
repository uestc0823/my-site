import React from 'react'

interface PageTitleProps {
  children: React.ReactNode
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => (
  <h2
    style={{
      fontSize: 28,
      fontWeight: 700,
      color: '#725d42',
      letterSpacing: 0.5,
      margin: 0,
      padding: '0 0 12px',
      borderBottom: '3px solid #19c8b9',
      display: 'inline-block',
    }}
  >
    {children}
  </h2>
)

export default PageTitle
