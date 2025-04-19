import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
// Use the Redis type from @upstash/redis for compatibility with Ratelimit
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://bright-monkey-19151.upstash.io', // Use the full URL
  token: 'AUrPAAIjcDFhNGQ2ZmZiMDYxNTk0ZTQ2YjJmNzM5ZTJjMWYxYzE1OXAxMA', // Use token instead of password for Upstash Redis
});


// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: '@upstash/ratelimit',
});

export async function middleware(request: NextRequest) {
  // Use x-forwarded-for header or fallback to a generic identifier
  const identifier = request.headers.get('x-forwarded-for') ?? request.headers.get('remote-addr') ?? '127.0.0.1';
  // Only destructure the needed properties
  const { success } = await ratelimit.limit(identifier);

  if (!success) {
    return new NextResponse('Rate limit exceeded', { status: 429 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*', // Apply middleware to all API routes
};
