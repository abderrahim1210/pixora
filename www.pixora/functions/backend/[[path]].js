export async function onRequest({ request, env }) {
  if (!env?.API_ORIGIN) {
    return new Response(JSON.stringify({ error: 'API_ORIGIN is not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const requestUrl = new URL(request.url);
  const path = requestUrl.pathname.slice('/backend'.length) || '/';
  const targetUrl = new URL(`${path}${requestUrl.search}`, env.API_ORIGIN);
  const headers = new Headers(request.headers);
  headers.delete('host');

  const init = {
    method: request.method,
    headers,
    redirect: 'manual',
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = request.body;
  }

  return fetch(targetUrl, init);
}
