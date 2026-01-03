"use client"

import { useState, useEffect } from 'react'

interface TypewriterProps {
  text: string
  speed?: number
  className?: string
}

export function Typewriter({ text, speed = 50, className = '' }: TypewriterProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 800)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span className={`opacity-0 transition-opacity duration-500 delay-500 ${className}`} style={{ opacity: 1 }}>
      {displayText}
      <span className={`inline-block w-0.5 h-6 bg-current ml-1 transition-opacity duration-800 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
    </span>
  )
}