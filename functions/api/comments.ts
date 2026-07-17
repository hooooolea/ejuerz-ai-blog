interface Env {
  DB: D1Database;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: CORS });
  }

  const url = new URL(request.url);

  // GET — list comments for a pet
  if (request.method === "GET") {
    const petSlug = url.searchParams.get("pet_slug");
    if (!petSlug) {
      return Response.json({ error: "缺少 pet_slug" }, { status: 400, headers: CORS });
    }

    const result = await env.DB.prepare(
      "SELECT * FROM comments WHERE pet_slug = ? ORDER BY created_at ASC LIMIT 500"
    ).bind(petSlug).all();

    return Response.json(result.results, { headers: CORS });
  }

  // POST — add a comment
  if (request.method === "POST") {
    let body: { pet_slug?: string; author_name?: string; content?: string; image_url?: string };
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "无效请求" }, { status: 400, headers: CORS });
    }

    const petSlug = (body.pet_slug ?? "").trim().slice(0, 120);
    const authorName = (body.author_name ?? "").trim().slice(0, 20) || "匿名";
    const content = (body.content ?? "").trim().slice(0, 500);
    const imageUrl = (body.image_url ?? "").trim().slice(0, 500);

    if (!petSlug || !content) {
      return Response.json({ error: "内容和宠物标识不能为空" }, { status: 400, headers: CORS });
    }

    const result = await env.DB.prepare(
      "INSERT INTO comments (pet_slug, author_name, content, image_url) VALUES (?, ?, ?, ?)"
    ).bind(petSlug, authorName, content, imageUrl || null).run();

    return Response.json({ id: result.meta.last_row_id }, { status: 201, headers: CORS });
  }

  // DELETE — admin only
  if (request.method === "DELETE") {
    const id = url.searchParams.get("id");
    const key = url.searchParams.get("key");

    if (!key || key !== (env as any).ADMIN_KEY) {
      return Response.json({ error: "无权限" }, { status: 401, headers: CORS });
    }

    if (!id) {
      return Response.json({ error: "缺少 id" }, { status: 400, headers: CORS });
    }

    await env.DB.prepare("DELETE FROM comments WHERE id = ?").bind(id).run();
    return Response.json({ ok: true }, { headers: CORS });
  }

  return new Response("Method Not Allowed", { status: 405 });
};
