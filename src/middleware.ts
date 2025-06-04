import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if we're on the admin page
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const password = request.nextUrl.searchParams.get('password');
    
    // If password is not correct, redirect to home
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};