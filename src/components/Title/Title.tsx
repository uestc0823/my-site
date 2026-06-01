import React from 'react'

export type TitleSize = 'small' | 'middle' | 'large'

export type TitleColor =
  | 'default'
  | 'app-pink'
  | 'purple'
  | 'app-blue'
  | 'app-yellow'
  | 'app-orange'
  | 'app-teal'
  | 'app-green'
  | 'app-red'
  | 'lime-green'
  | 'yellow-green'
  | 'brown'
  | 'warm-peach-pink'

export interface TitleProps {
  children: React.ReactNode
  size?: TitleSize
  color?: TitleColor
  className?: string
  style?: React.CSSProperties
}

const SIZE_MAP: Record<TitleSize, number> = {
  small: 14,
  middle: 20,
  large: 28,
}

const COLOR_MAP: Record<TitleColor, { front: string; back: string; fold: string; text: string }> = {
  'default':           { front: '#27d039', back: '#20992a', fold: '#115017', text: '#fff' },
  'app-pink':          { front: '#f8a6b2', back: '#e06880', fold: '#a03060', text: '#fff' },
  'purple':            { front: '#b77dee', back: '#9050d0', fold: '#5a1a9a', text: '#fff' },
  'app-blue':          { front: '#889df0', back: '#5068d8', fold: '#2030a0', text: '#fff' },
  'app-yellow':        { front: '#f7cd67', back: '#d4a030', fold: '#8a6010', text: '#725d42' },
  'app-orange':        { front: '#e59266', back: '#c06a30', fold: '#7a3a10', text: '#fff' },
  'app-teal':          { front: '#82d5bb', back: '#40a880', fold: '#186048', text: '#fff' },
  'app-green':         { front: '#8ac68a', back: '#509050', fold: '#205020', text: '#fff' },
  'app-red':           { front: '#fc736d', back: '#d43030', fold: '#900010', text: '#fff' },
  'lime-green':        { front: '#d1da49', back: '#90a010', fold: '#485800', text: '#3d5a1a' },
  'yellow-green':      { front: '#ecdf52', back: '#c0b010', fold: '#706800', text: '#725d42' },
  'brown':             { front: '#9a835a', back: '#705830', fold: '#3a2810', text: '#fff' },
  'warm-peach-pink':   { front: '#e18c6f', back: '#b85a30', fold: '#6a2a10', text: '#fff' },
}

export const Title: React.FC<TitleProps> = ({
  children,
  size = 'middle',
  color = 'default',
  className,
  style,
}) => {
  const fontSize = SIZE_MAP[size]
  const colors = COLOR_MAP[color]

  return (
    <div
      className={className}
      style={{
        display: 'inline-block',
        fontFamily: "Nunito, 'Noto Sans SC', 'Zen Maru Gothic', -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
        fontWeight: 800,
        lineHeight: 1,
        userSelect: 'none',
        ...style,
      }}
    >
      <span
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '2em',
          padding: '0 1.6em',
          color: colors.text,
          fontWeight: 900,
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
          fontSize: `${fontSize}px`,
          filter: 'drop-shadow(0 0.08em 0.12em rgba(0, 0, 0, 0.05))',
        }}
      >
        {/* Left tail */}
        <span
          style={{
            position: 'absolute',
            bottom: '-0.4em',
            left: '-0.6em',
            width: '1.7em',
            height: '1.7em',
            background: colors.back,
            zIndex: 1,
            borderRadius: '0.08em 0 0 0.08em',
            clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%, 30% 50%, 0% 0%)',
          }}
        />
        {/* Right tail */}
        <span
          style={{
            position: 'absolute',
            bottom: '-0.4em',
            right: '-0.6em',
            width: '1.7em',
            height: '1.7em',
            background: colors.back,
            zIndex: 1,
            borderRadius: '0 0.08em 0.08em 0',
            clipPath: 'polygon(0% 0%, 100% 0%, 70% 50%, 100% 100%, 0% 100%)',
          }}
        />
        {/* Left fold */}
        <span
          style={{
            position: 'absolute',
            top: 'calc(100% - 0.05em)',
            left: '0.15em',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '0 0.95em 0.45em 0',
            borderColor: `transparent ${colors.fold} transparent transparent`,
            zIndex: 2,
          }}
        />
        {/* Right fold */}
        <span
          style={{
            position: 'absolute',
            top: 'calc(100% - 0.05em)',
            right: '0.16em',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '0 0 0.45em 0.95em',
            borderColor: `transparent transparent transparent ${colors.fold}`,
            zIndex: 2,
          }}
        />
        {/* Front face */}
        <span
          style={{
            position: 'absolute',
            inset: '0 0.1em',
            background: colors.front,
            borderRadius: '0.2em',
            zIndex: 3,
            transform: 'perspective(11.5em) rotateX(3deg)',
            boxShadow: 'inset 0 -0.06em 0 rgba(0, 0, 0, 0.05)',
            pointerEvents: 'none',
          }}
        />
        {/* Text */}
        <span
          style={{
            position: 'relative',
            zIndex: 4,
            fontSize: 'inherit',
            display: 'inline-flex',
            alignItems: 'center',
            height: '2em',
            paddingTop: '0.11em',
            color: colors.text,
            textShadow: '0 0.04em 0.08em rgba(0, 0, 0, 0.05)',
          }}
        >
          {children}
        </span>
      </span>
    </div>
  )
}

Title.displayName = 'Title'
export default Title
