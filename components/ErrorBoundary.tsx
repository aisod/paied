'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // #region agent log
    if (typeof window !== 'undefined') {
      fetch('http://127.0.0.1:7242/ingest/e523e8a1-77e3-4f5b-8cd9-f76bae5c8729', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: 'ErrorBoundary.tsx:componentDidCatch',
          message: 'Error caught by boundary',
          data: {
            errorMessage: error.message,
            errorStack: error.stack,
            componentStack: errorInfo.componentStack,
            errorName: error.name
          },
          timestamp: Date.now(),
          sessionId: 'debug-session',
          runId: 'run6',
          hypothesisId: 'I'
        })
      }).catch(() => {})
    }
    // #endregion
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6">{this.state.error?.message}</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200 text-sm font-medium shadow-md hover:shadow-lg"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
