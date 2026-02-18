import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  company?: string; // honeypot
};

function safeText(s: unknown) {
  return String(s ?? "").trim().slice(0, 8000);
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "Server misconfigured: RESEND_API_KEY missing." },
        { status: 500 }
      );
    }

    const body = (await req.json()) as Payload;

    // honeypot: if filled, silently accept
    if (body.company && safeText(body.company).length > 0) {
      return NextResponse.json({ ok: true });
    }

    const name = safeText(body.name);
    const email = safeText(body.email);
    const phone = safeText(body.phone);
    const service = safeText(body.service);
    const message = safeText(body.message);

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    const subject = `EVG Contact: ${service || "General"} — ${name}`;

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
        <h2>New Contact Message (EVG)</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "-")}</p>
        <p><strong>Service:</strong> ${escapeHtml(service || "-")}</p>
        <hr />
        <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
      </div>
    `;

    await resend.emails.send({
      from: "Elite Visa Global <onboarding@resend.dev>",
      to: ["elitevisaglobal@gmail.com"],
      replyTo: email,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
