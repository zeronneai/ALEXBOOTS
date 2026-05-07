export const config = { runtime: 'edge' };

const STORE_DOMAIN = process.env.VITE_SHOPIFY_STORE_DOMAIN!;
const PRIVATE_TOKEN = process.env.SHOPIFY_PRIVATE_TOKEN!;
const SHOPIFY_URL = `https://${STORE_DOMAIN}/api/2024-01/graphql.json`;

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const body = await request.text();

  const shopifyRes = await fetch(SHOPIFY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': PRIVATE_TOKEN,
    },
    body,
  });

  const data = await shopifyRes.text();

  return new Response(data, {
    status: shopifyRes.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
