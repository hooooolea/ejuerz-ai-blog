interface Env {
  DB: D1Database;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: CORS });
  }

  if (request.method === "GET") {
    const result = await env.DB.prepare(
      "SELECT id, name, message, created_at FROM messages ORDER BY created_at DESC LIMIT 200"
    ).all();
    return Response.json(result.results, { headers: CORS });
  }

  if (request.method === "POST") {
    let body: { name?: string; message?: string };
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "无效请求" }, { status: 400, headers: CORS });
    }

    const name = (body.name ?? "").trim().slice(0, 20);
    const message = (body.message ?? "").trim().slice(0, 200);

    if (!name || !message) {
      return Response.json({ error: "昵称和留言不能为空" }, { status: 400, headers: CORS });
    }

    await env.DB.prepare(
      "INSERT INTO messages (name, message) VALUES (?, ?)"
    ).bind(name, message).run();

    return Response.json({ ok: true }, { headers: CORS });
  }

  return new Response("Method Not Allowed", { status: 405 });
};
