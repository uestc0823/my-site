import React, { useState, useEffect } from 'react'

interface CycleTypewriterProps {
  texts: string[]
  typeSpeed?: number
  deleteSpeed?: number
  pauseTime?: number
  style?: React.CSSProperties
  cursorStyle?: React.CSSProperties
}

const CycleTypewriter: React.FC<CycleTypewriterProps> = ({
  texts,
  typeSpeed = 120,
  deleteSpeed = 60,
  pauseTime = 2000,
  style,
  cursorStyle,
}) => {
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  const currentText = texts[textIndex]

  // Cursor blink
  useEffect(() => {
    const blink = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(blink)
  }, [])

  // Typing / deleting logic
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    if (!isDeleting && charIndex < currentText.length) {
      // Typing forward
      timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1)
      }, typeSpeed + Math.random() * 40)
    } else if (!isDeleting && charIndex === currentText.length) {
      // Finished typing, pause then start deleting
      timer = setTimeout(() => {
        setIsDeleting(true)
      }, pauseTime)
    } else if (isDeleting && charIndex > 0) {
      // Deleting backward
      timer = setTimeout(() => {
        setCharIndex((prev) => prev - 1)
      }, deleteSpeed)
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, move to next text
      setIsDeleting(false)
      setTextIndex((prev) => (prev + 1) % texts.length)
    }

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, currentText, typeSpeed, deleteSpeed, pauseTime, texts.length])

  return (
    <span style={style}>
      {currentText.slice(0, charIndex)}
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          background: '#4a4238',
          marginLeft: 2,
          verticalAlign: 'text-bottom',
          opacity: showCursor ? 1 : 0,
          transition: 'opacity 0.1s',
          ...cursorStyle,
        }}
      />
    </span>
  )
}

CycleTypewriter.displayName = 'CycleTypewriter'
export default CycleTypewriter
