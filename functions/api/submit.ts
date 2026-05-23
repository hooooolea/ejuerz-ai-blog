import { WorkerMailer } from "@ryyr/worker-mailer";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const SMTP_USER = "shianke6yx@163.com";
const SMTP_PASS = "UGvsjQ6BAuRbjYri";
const SMTP_HOST = "smtp.163.com";
const SMTP_PORT = 465;
const RECIPIENT = "shianke6yx@163.com";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_MESSAGE_LENGTH = 5000;

export const onRequest: PagesFunction = async ({ request }) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: CORS });
  }

  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405, headers: CORS });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "无效请求" }, { status: 400, headers: CORS });
  }

  const message = String(formData.get("message") ?? "").trim().slice(0, MAX_MESSAGE_LENGTH);
  const file = formData.get("file");

  if (!message) {
    return Response.json({ error: "投稿内容不能为空" }, { status: 400, headers: CORS });
  }

  if (file instanceof File && file.size > MAX_FILE_SIZE) {
    return Response.json({ error: "文件大小不能超过 5MB" }, { status: 400, headers: CORS });
  }

  try {
    const mailer = await WorkerMailer.connect({
      host: SMTP_HOST,
      port: SMTP_PORT,
      username: SMTP_USER,
      password: SMTP_PASS,
      authType: ["login", "plain"],
    });

    const attachments =
      file instanceof File && file.size > 0
        ? [
            {
              filename: file.name,
              content: new Uint8Array(await file.arrayBuffer()),
              mimeType: file.type || undefined,
            },
          ]
        : undefined;

    await mailer.send({
      from: SMTP_USER,
      to: RECIPIENT,
      subject: "工商共享投稿",
      text: message,
      attachments,
    });

    await mailer.close();

    return Response.json({ ok: true }, { headers: CORS });
  } catch (error) {
    console.error("Submit email failed:", error);
    return Response.json(
      { error: "邮件发送失败，请稍后重试" },
      { status: 500, headers: CORS }
    );
  }
};
