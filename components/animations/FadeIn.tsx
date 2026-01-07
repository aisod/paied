"use client"

import { ReactNode, useEffect, useRef, useState } from 'react'

interface FadeInProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  className?: string
}

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = ''
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if element is already in viewport on mount
    const checkInitialVisibility = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const windowHeight = window.innerHeight || document.documentElement.clientHeight
        const windowWidth = window.innerWidth || document.documentElement.clientWidth
        
        // Check if element is in viewport (with some margin)
        const isInViewport = 
          rect.top < windowHeight + 200 && 
          rect.bottom > -200 &&
          rect.left < windowWidth + 200 &&
          rect.right > -200
        
        if (isInViewport) {
          // Element is already visible, show it immediately
          setTimeout(() => setIsVisible(true), delay)
          return true
        }
      }
      return false
    }

    // Check immediately on mount
    if (checkInitialVisibility()) {
      return // Already visible, no need for observer
    }

    // Set up observer for elements not yet in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.disconnect()
        }
      },
      { 
        threshold: 0.01, // Lower threshold to trigger earlier
        rootMargin: '100px' // Changed from -100px to 100px to trigger earlier
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    // Fallback: make visible after 1 second if observer hasn't fired
    // This ensures content is never permanently hidden
    const fallbackTimeout = setTimeout(() => {
      if (!isVisible) {
        setIsVisible(true)
      }
    }, Math.max(1000, delay + 500))

    return () => {
      observer.disconnect()
      clearTimeout(fallbackTimeout)
    }
  }, [delay, isVisible])

  const directionTransforms = {
    up: 'translateY(30px)',
    down: 'translateY(-30px)',
    left: 'translateX(30px)',
    right: 'translateX(-30px)'
  }

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : directionTransforms[direction],
        transitionDuration: `${duration * 1000}ms`,
        transitionDelay: `${delay}ms`,
        transitionProperty: 'opacity, transform'
      }}
    >
      {children}
    </div>
  )
}