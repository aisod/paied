'use client'

import { useEffect } from 'react'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Keyboard } from '@capacitor/keyboard'
import { App } from '@capacitor/app'
import { Haptics, ImpactStyle } from '@capacitor/haptics'

/**
 * Mobile App Initialization Component
 * Handles Capacitor-specific mobile app features
 */
export function MobileApp() {
  useEffect(() => {
    // Only run on mobile platforms (not in browser)
    if (!Capacitor.isNativePlatform()) {
      return
    }

    const initializeMobileApp = async () => {
      try {
        // Configure Status Bar
        await StatusBar.setStyle({ style: Style.Default })
        await StatusBar.setBackgroundColor({ color: '#0ea5e9' })

        // Configure Keyboard
        Keyboard.setAccessoryBarVisible({ isVisible: true })
        
        // Handle keyboard events
        Keyboard.addListener('keyboardWillShow', () => {
          // Scroll to active input when keyboard appears
          const activeElement = document.activeElement as HTMLElement
          if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
            setTimeout(() => {
              activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }, 300)
          }
        })

        // Handle app state changes
        App.addListener('appStateChange', ({ isActive }) => {
          if (isActive) {
            // App came to foreground
            console.log('App is active')
          } else {
            // App went to background
            console.log('App is inactive')
          }
        })

        // Handle back button (Android)
        App.addListener('backButton', ({ canGoBack }) => {
          if (!canGoBack) {
            // Exit app if can't go back
            App.exitApp()
          } else {
            // Navigate back
            window.history.back()
          }
        })

        // Add haptic feedback to buttons on mobile
        const addHapticFeedback = () => {
          const buttons = document.querySelectorAll('button, a[role="button"], .btn-primary, .btn-secondary')
          buttons.forEach((button) => {
            button.addEventListener('touchstart', async () => {
              try {
                await Haptics.impact({ style: ImpactStyle.Light })
              } catch (e) {
                // Haptics not available, ignore
              }
            })
          })
        }

        // Add haptic feedback after a short delay to ensure DOM is ready
        setTimeout(addHapticFeedback, 1000)
      } catch (error) {
        console.error('Error initializing mobile app:', error)
      }
    }

    initializeMobileApp()

    // Cleanup
    return () => {
      Keyboard.removeAllListeners()
      App.removeAllListeners()
    }
  }, [])

  return null // This component doesn't render anything
}
