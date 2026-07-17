interface Env {
  DB: D1Database;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9一-鿿]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    || "pet";
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: CORS });
  }

  const url = new URL(request.url);

  // GET — list all user-submitted pets, or get one by slug
  if (request.method === "GET") {
    const slug = url.searchParams.get("slug");
    if (slug) {
      const result = await env.DB.prepare(
        "SELECT * FROM pets WHERE slug = ?"
      ).bind(slug).first();
      if (!result) {
        return Response.json({ error: "未找到" }, { status: 404, headers: CORS });
      }
      if (result.images && typeof result.images === "string") {
        try { result.images = JSON.parse(result.images); } catch { result.images = []; }
      }
      return Response.json(result, { headers: CORS });
    }

    const result = await env.DB.prepare(
      "SELECT * FROM pets ORDER BY created_at DESC LIMIT 100"
    ).all();
    const pets = result.results.map(p => {
      if (p.images && typeof p.images === "string") {
        try { p.images = JSON.parse(p.images); } catch { p.images = []; }
      }
      return p;
    });
    return Response.json(pets, { headers: CORS });
  }

  // POST — create a new pet
  if (request.method === "POST") {
    let body: { name?: string; description?: string; content?: string; cover?: string; images?: string[]; author?: string };
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "无效请求" }, { status: 400, headers: CORS });
    }

    const name = (body.name ?? "").trim().slice(0, 100);
    const description = (body.description ?? "").trim().slice(0, 200);
    const content = (body.content ?? "").trim().slice(0, 5000);
    const cover = (body.cover ?? "").trim().slice(0, 500);
    const images = Array.isArray(body.images) ? body.images.slice(0, 10).map(i => String(i).trim().slice(0, 500)) : [];
    const author = (body.author ?? "").trim().slice(0, 20) || "匿名";

    if (!name || !description) {
      return Response.json({ error: "名字和描述不能为空" }, { status: 400, headers: CORS });
    }

    // Generate unique slug
    const baseSlug = `user-${slugify(name)}`;
    const ts = Date.now();
    const slug = `${baseSlug}-${ts}`;

    const stmt = env.DB.prepare(
      "INSERT INTO pets (slug, name, description, content, cover, images, author) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).bind(slug, name, description, content, cover, JSON.stringify(images), author);

    const result = await stmt.run();

    return Response.json({ id: result.meta.last_row_id, slug }, { status: 201, headers: CORS });
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

    await env.DB.prepare("DELETE FROM pets WHERE id = ?").bind(id).run();
    return Response.json({ ok: true }, { headers: CORS });
  }

  return new Response("Method Not Allowed", { status: 405 });
};
