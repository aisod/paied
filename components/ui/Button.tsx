"use client"

import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'

interface BaseButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  href?: string
  external?: boolean
  className?: string
}

type ButtonProps = BaseButtonProps & (
  | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
  | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
)

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  href,
  external,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] min-h-[44px] touch-manipulation'

  const variantClasses = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700 focus:ring-gray-500 shadow-md hover:shadow-lg border border-gray-900',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-500 shadow-sm hover:shadow-md border border-gray-200',
    outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 hover:border-gray-400 focus:ring-gray-500 bg-white shadow-sm hover:shadow-md'
  }

  const sizeClasses = {
    sm: 'px-4 py-2.5 text-xs min-h-[44px]', // Mobile-first: minimum 44px touch target
    md: 'px-5 py-3 text-sm min-h-[44px] sm:px-6 sm:py-3.5', // Mobile-first with desktop enhancement
    lg: 'px-6 py-3.5 text-base min-h-[48px] sm:px-8 sm:py-4 sm:text-lg' // Mobile-first with desktop enhancement
  }

  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  const content = (
    <>
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </>
  )

  // If href is provided, render as link
  if (href) {
    const linkProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' as const }
      : {}
    
    return (
      <a
        className={allClasses}
        href={href}
        {...linkProps}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    )
  }

  // Otherwise render as button
  return (
    <button
      className={allClasses}
      disabled={isLoading}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  )
}
