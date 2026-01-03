import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/sections/Footer'
import { BottomNavigation } from '@/components/layout/BottomNavigation'
import { PWAInstaller } from '@/components/PWAInstaller'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AISOD PAIED Program - Free AI Engineering Course 2026',
  description: 'Transform from beginner to AI Engineer/Developer for FREE. 9-month practical program with hands-on projects, ethical AI focus, and career launch. Start February 6th, 2026.',
  icons: {
    icon: [
      { url: '/images/AISOD Institute logo new.png', type: 'image/png' },
      { url: '/images/AISOD Institute logo new.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/AISOD Institute logo new.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/images/AISOD Institute logo new.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PAIED" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                console.log('[DEBUG] Error handler script loaded');
                var logEndpoint = 'http://127.0.0.1:7242/ingest/e523e8a1-77e3-4f5b-8cd9-f76bae5c8729';
                
                function sendLog(data) {
                  try {
                    fetch(logEndpoint, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data)
                    }).catch(function(err) {
                      console.error('[DEBUG] Log send failed:', err);
                    });
                  } catch (e) {
                    console.error('[DEBUG] Log send error:', e);
                  }
                }
                
                // Test log to verify handler is working
                sendLog({
                  location: 'layout.tsx:script-init',
                  message: 'Error handler initialized',
                  data: { timestamp: Date.now() },
                  timestamp: Date.now(),
                  sessionId: 'debug-session',
                  runId: 'run10',
                  hypothesisId: 'M'
                });
                
                var originalConsoleError = console.error;
                console.error = function() {
                  var args = Array.prototype.slice.call(arguments);
                  var errorStr = args.map(function(arg) {
                    try {
                      return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
                    } catch (e) {
                      return String(arg);
                    }
                  }).join(' ');
                  
                  // Log ALL console.error calls for debugging
                  if (errorStr && (errorStr.includes('useContext') || errorStr.includes('null') || errorStr.includes('Cannot read') || errorStr.includes('Error'))) {
                    sendLog({
                      location: 'console.error',
                      message: 'Console error intercepted',
                      data: {
                        errorMessage: errorStr,
                        allArgs: args.map(function(a) { try { return String(a); } catch(e) { return '[object]'; } })
                      },
                      timestamp: Date.now(),
                      sessionId: 'debug-session',
                      runId: 'run10',
                      hypothesisId: 'M'
                    });
                  }
                  originalConsoleError.apply(console, args);
                };
                
                if (typeof window !== 'undefined') {
                  window.addEventListener('error', function(e) {
                    var errorMsg = e.message || (e.error && e.error.message) || String(e);
                    if (errorMsg && (errorMsg.includes('useContext') || errorMsg.includes('null') || errorMsg.includes('Cannot read'))) {
                      sendLog({
                        location: 'window.error',
                        message: 'Global error caught',
                        data: {
                          errorMessage: errorMsg,
                          errorStack: e.error ? e.error.stack : 'No stack',
                          filename: e.filename || 'unknown',
                          lineno: e.lineno || 'unknown',
                          colno: e.colno || 'unknown',
                          errorType: e.error ? e.error.name : 'unknown'
                        },
                        timestamp: Date.now(),
                        sessionId: 'debug-session',
                        runId: 'run10',
                        hypothesisId: 'M'
                      });
                    }
                  }, true);
                  
                  window.addEventListener('unhandledrejection', function(e) {
                    var errorMsg = e.reason ? (e.reason.message || String(e.reason)) : String(e);
                    if (errorMsg && (errorMsg.includes('useContext') || errorMsg.includes('null') || errorMsg.includes('Cannot read'))) {
                      sendLog({
                        location: 'window.unhandledrejection',
                        message: 'Unhandled promise rejection',
                        data: {
                          errorMessage: errorMsg,
                          errorStack: e.reason ? (e.reason.stack || 'No stack') : 'No stack',
                          errorType: e.reason ? e.reason.name : 'unknown'
                        },
                        timestamp: Date.now(),
                        sessionId: 'debug-session',
                        runId: 'run10',
                        hypothesisId: 'M'
                      });
                    }
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <ErrorBoundary>
          <LanguageProvider>
            <PWAInstaller />
            <Navbar />
            <main className="min-h-screen pt-16 pb-20 md:pb-0">
              {children}
            </main>
            <Footer />
            <BottomNavigation />
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}