interface Env {
  BUCKET: R2Bucket;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: CORS });
  }

  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    return Response.json({ error: "需要上传文件" }, { status: 400, headers: CORS });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "无效表单数据" }, { status: 400, headers: CORS });
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return Response.json({ error: "未选择文件" }, { status: 400, headers: CORS });
  }

  if (!file.type.startsWith("image/")) {
    return Response.json({ error: "仅支持图片文件" }, { status: 400, headers: CORS });
  }

  if (file.size > MAX_SIZE) {
    return Response.json({ error: "图片不能超过 5 MB" }, { status: 400, headers: CORS });
  }

  // Generate unique filename: timestamp_random.ext
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const key = `pets/${Date.now()}_${crypto.randomUUID().slice(0, 8)}.${ext}`;

  await env.BUCKET.put(key, file.stream(), {
    httpMetadata: { contentType: file.type },
  });

  const url = `https://pub-1195a2151a624a57b173ba11534b4e76.r2.dev/${key}`;

  return Response.json({ url }, { headers: CORS });
};
