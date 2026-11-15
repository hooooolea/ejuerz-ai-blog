import assert from "node:assert/strict";
import test from "node:test";
import { onRequest } from "./[[path]].ts";

const env = { EDUAGENT_UPSTREAM_ORIGIN: "https://eduagent.example" };

function context(request, configuredEnv = env) {
  return { request, env: configuredEnv };
}

test("returns 503 when the upstream origin is missing or invalid", async () => {
  for (const origin of [undefined, "http://eduagent.example", "https://user:pass@eduagent.example", "not a URL"]) {
    const response = await onRequest(context(new Request("https://site.example/eduagent/api/chat"), {
      EDUAGENT_UPSTREAM_ORIGIN: origin,
    }));
    assert.equal(response.status, 503);
  }
});

test("maps path and query and forwards POST body and Authorization", async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });
  let upstreamRequest;
  globalThis.fetch = async (input, init) => {
    upstreamRequest = { url: String(input), init };
    return new Response("ok");
  };

  const response = await onRequest(context(new Request("https://site.example/eduagent/api/chat/next?mode=fast&n=2", {
    method: "POST",
    headers: { Authorization: "Bearer secret", "Content-Type": "application/json" },
    body: JSON.stringify({ message: "hello" }),
  })));

  assert.equal(response.status, 200);
  assert.equal(upstreamRequest.url, "https://eduagent.example/api/chat/next?mode=fast&n=2");
  assert.equal(upstreamRequest.init.headers.get("authorization"), "Bearer secret");
  assert.equal(await new Response(upstreamRequest.init.body).text(), JSON.stringify({ message: "hello" }));
});

test("preserves SSE streaming body, sets no-cache directives, and removes hop-by-hop headers", async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("data: hello\n\n"));
      controller.close();
    },
  });
  globalThis.fetch = async () => new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Connection": "keep-alive, x-internal",
      "Keep-Alive": "timeout=5",
      "X-Internal": "remove-me",
      "Transfer-Encoding": "chunked",
      "X-Keep": "yes",
    },
  });

  const response = await onRequest(context(new Request("https://site.example/eduagent/api/events")));
  assert.equal(response.headers.get("cache-control"), "no-cache, no-transform");
  for (const header of ["connection", "keep-alive", "x-internal", "transfer-encoding"]) {
    assert.equal(response.headers.has(header), false, `${header} should be removed`);
  }
  assert.equal(response.headers.get("x-keep"), "yes");
  assert.ok(response.body instanceof ReadableStream);
  assert.equal(await response.text(), "data: hello\n\n");
});
