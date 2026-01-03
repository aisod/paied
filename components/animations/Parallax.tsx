"use client"

import { ReactNode } from 'react'

interface ParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function Parallax({ children, speed = 0.5, className = '' }: ParallaxProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}