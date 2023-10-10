import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routes } from '@/utils/routes';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (url.pathname === '/' && !!request.cookies.get('next-auth.session-token')) {
    return NextResponse.redirect(url.origin + routes.search);
  }
}
