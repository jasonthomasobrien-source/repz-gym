import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow access to /admin-demo (password gate)
  if (request.nextUrl.pathname === '/admin-demo') {
    return NextResponse.next();
  }

  // For /admin-demo/*, check for valid demo session
  if (request.nextUrl.pathname.startsWith('/admin-demo/')) {
    const demoSession = request.cookies.get('demo-session')?.value;
    if (!demoSession || demoSession !== 'gym') {
      // Invalid or missing session — redirect to gate
      return NextResponse.redirect(new URL('/admin-demo', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin-demo/:path*'],
};
