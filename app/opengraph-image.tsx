import { ImageResponse } from 'next/og'

export const alt = 'AISOD PAIED Program - Free AI Engineering Course 2026'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 60,
            background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
              textAlign: 'center',
              maxWidth: '1000px',
            }}
          >
            <div
              style={{
                fontSize: 80,
                fontWeight: 'bold',
                color: '#111827',
                letterSpacing: '-0.02em',
              }}
            >
              AISOD PAIED Program
            </div>
            <div
              style={{
                fontSize: 52,
                color: '#374151',
                fontWeight: '600',
                maxWidth: '900px',
                lineHeight: '1.2',
              }}
            >
              Transform from Beginner to AI Engineer & Developer
            </div>
            <div
              style={{
                fontSize: 40,
                color: '#6B7280',
                marginTop: '16px',
                fontWeight: '500',
              }}
            >
              9-Month FREE Program • Starting February 2026
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    )
  } catch (e) {
    return new Response('Failed to generate image', { status: 500 })
  }
}
