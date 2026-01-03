import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // For now, return a simple message - PDF generation will be optimized later
    return NextResponse.json(
      { message: 'PDF generation temporarily disabled during build. Please contact AISOD Institute for the manual.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('PDF generation error:', error)

    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}