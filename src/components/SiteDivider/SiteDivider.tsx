import React from 'react'
import styles from './siteDivider.module.less'

export type DividerType =
  | 'line-brown'
  | 'line-teal'
  | 'line-white'
  | 'line-yellow'
  | 'wave-yellow'
  | 'dashed-brown'
  | 'dashed-teal'
  | 'dashed-white'
  | 'dashed-yellow'

export interface DividerProps {
  /** 分隔线类型 */
  type?: DividerType
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  style?: React.CSSProperties
}

/**
 * 站点内置的分隔线（沿用 animal-island-ui 0.9.x 的线状样式，
 * 因为 1.11+ 移除了 line-* 变体）。
 */
const Divider: React.FC<DividerProps> = ({ type = 'line-brown', className, style }) => {
  const cls = [styles.divider, styles[type], className].filter(Boolean).join(' ')
  return <div className={cls} style={style} />
}

Divider.displayName = 'SiteDivider'
export default Divider