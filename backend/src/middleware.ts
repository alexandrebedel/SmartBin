import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const isConnected = await getSession();
  if (!isConnected) return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: '/stats/:path*',
}