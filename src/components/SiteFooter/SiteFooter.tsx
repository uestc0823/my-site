import React from 'react'
import styles from './siteFooter.module.less'

export type FooterType = 'sea' | 'tree'

export interface FooterProps {
  /** Footer 类型 */
  type?: FooterType
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  style?: React.CSSProperties
}

/**
 * 站点内置的装饰性 Footer（沿用 animal-island-ui 0.9.x 的海面/树林样式，
 * 因为 1.13+ 把 Footer 改成了版权栏）。
 */
const Footer: React.FC<FooterProps> = ({ type = 'tree', className, style }) => {
  const cls = [styles.footer, styles[type], className].filter(Boolean).join(' ')
  return <div className={cls} style={style} />
}

Footer.displayName = 'SiteFooter'
export default Footer