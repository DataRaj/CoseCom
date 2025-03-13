import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define protected routes
  const protectedRoutes = ['/cart', '/orders'];

  // Check if the current path starts with any of the protected routes
  const isProtectedRoute = protectedRoutes.some(route =>
    path === route || path.startsWith(`${route}/`)
  );

  if (isProtectedRoute) {
    // Verify the session using auth
    // const session = await getSession.();

    // If no session exists, redirect to the login page
    // if (!session) {
    //   // Store the original URL to redirect back after login
    //   const redirectUrl = new URL('/auth/login', request.url);
    //   redirectUrl.searchParams.set('callbackUrl', request.url);

    //   return NextResponse.redirect(redirectUrl);
    // }
  }

  // Continue with the request if either:
  // 1. The route is not protected
  // 2. The user is authenticated
  return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ['/cart/:path*', '/orders/:path*'],
};
