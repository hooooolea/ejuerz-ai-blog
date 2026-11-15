interface Env {
  EDUAGENT_UPSTREAM_ORIGIN?: string;
}

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

function upstreamOrigin(value: string | undefined): URL | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  const origin = upstreamOrigin(env.EDUAGENT_UPSTREAM_ORIGIN);
  if (!origin) return new Response("EduAgent upstream is not configured", { status: 503 });

  const incoming = new URL(request.url);
  if (incoming.pathname !== "/eduagent/api" && !incoming.pathname.startsWith("/eduagent/api/")) {
    return new Response("Not Found", { status: 404 });
  }

  const suffix = incoming.pathname.slice("/eduagent/api".length);
  const target = new URL(`/api${suffix}`, origin);
  target.search = incoming.search;

  const headers = new Headers(request.headers);
  const requestConnectionHeaders = headers.get("connection");
  if (requestConnectionHeaders) {
    for (const header of requestConnectionHeaders.split(",")) {
      headers.delete(header.trim());
    }
  }
  for (const header of HOP_BY_HOP_HEADERS) headers.delete(header);
  headers.delete("host");
  headers.delete("content-length");
  const response = await fetch(target, {
    method: request.method,
    headers,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
    // Preserve cancellation, including clients closing POST SSE requests.
    signal: request.signal,
    // Cloudflare Workers requires duplex for streaming request bodies in compatible runtimes.
    duplex: "half",
  } as RequestInit);

  const responseHeaders = new Headers(response.headers);
  const connectionHeaders = responseHeaders.get("connection");
  if (connectionHeaders) {
    for (const header of connectionHeaders.split(",")) {
      responseHeaders.delete(header.trim());
    }
  }
  for (const header of HOP_BY_HOP_HEADERS) responseHeaders.delete(header);
  if ((response.headers.get("content-type") ?? "").toLowerCase().includes("text/event-stream")) {
    responseHeaders.set("Cache-Control", "no-cache, no-transform");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
};
