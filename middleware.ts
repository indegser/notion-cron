// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers)
  const origin = request.headers.get('origin')

  if (origin?.includes('indegser.com')) {
    headers.set('Access-Control-Allow-Origin', origin)
  }

  return NextResponse.next({
    headers,
  })
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}