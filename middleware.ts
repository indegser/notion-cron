// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers)
  const origin = request.headers.get('origin')
  
  /** @todo Authorization with jwt token */
  if (origin?.includes('indegser.com')) {
    headers.set('Access-Control-Allow-Origin', origin)
    headers.set('Access-Control-Request-Headers', '*')
    headers.set('Access-Control-Allow-Credentials', 'true')
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  }

  return NextResponse.next({
    headers,
  })
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}