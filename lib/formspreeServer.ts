/**
 * Formspree URL for server-side forwarding only (never exposed to the browser).
 * Prefer FORMSPREE_ENDPOINT on Vercel; NEXT_PUBLIC_ still works for compatibility.
 */
export function getFormspreeEndpoint(): string {
  return (
    process.env.FORMSPREE_ENDPOINT?.trim() ||
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() ||
    ""
  );
}

export function assertFormspreeUrl(endpoint: string): string | null {
  if (!endpoint) {
    return "Form is not configured. In Vercel → Environment Variables, set FORMSPREE_ENDPOINT (recommended) or NEXT_PUBLIC_FORMSPREE_ENDPOINT to your full Formspree URL (https://formspree.io/f/…), then redeploy.";
  }
  if (!endpoint.startsWith("https://formspree.io/")) {
    return "Invalid form URL. Use your Formspree link (https://formspree.io/f/…), not your Vercel or website URL — that causes HTTP 405.";
  }
  return null;
}
