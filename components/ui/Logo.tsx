'use client'

import Image from 'next/image'
import { useState } from 'react'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const [imageError, setImageError] = useState(false)

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-12 sm:h-12',
    lg: 'w-16 h-16 sm:w-20 sm:h-20'
  }

  const textSizeClasses = {
    sm: 'text-sm sm:text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-xl sm:text-2xl'
  }

  if (imageError) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className={`${sizeClasses[size]} bg-gray-900 rounded flex items-center justify-center`}>
          <span className="text-white font-bold text-xs sm:text-sm">AI</span>
        </div>
        {showText && (
          <span className={`font-bold ${textSizeClasses[size]} hidden sm:block`}>PAIED Program</span>
        )}
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <Image
          src="/images/AISOD Institute logo new.png"
          alt="AISOD Institute"
          fill
          sizes="48px"
          className="object-contain"
          priority
          onError={() => setImageError(true)}
        />
      </div>
      {showText && (
        <span className={`font-bold ${textSizeClasses[size]} hidden sm:block text-gray-900`}>PAIED Program</span>
      )}
    </div>
  )
}
