// route handler with secret and slug
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

import { env } from '~/env';

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const url = searchParams.get('url');

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== env.DRAFT_MODE_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  // Enable Draft Mode by setting the cookie
  draftMode().enable();

  // Redirect to the give url or the root
  redirect(url ?? '/');
}
