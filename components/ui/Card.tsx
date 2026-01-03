"use client"

import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 border border-gray-200 ${hover ? 'hover:shadow-md hover:border-gray-300' : ''} ${className}`}
    >
      {children}
    </div>
  )
}