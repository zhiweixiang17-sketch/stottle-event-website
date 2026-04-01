import {
  assertFormspreeUrl,
  getFormspreeEndpoint,
} from "@/lib/formspreeServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const endpoint = getFormspreeEndpoint();
  const urlError = assertFormspreeUrl(endpoint);
  if (urlError) {
    return NextResponse.json({ error: urlError }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const _subject = String(
    body._subject ?? "Contact form — Stottle Event Space",
  ).trim();
  const form_source = String(body.form_source ?? "contact_page").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      message,
      _subject,
      form_source,
    }),
  });

  if (!res.ok) {
    let detail = "";
    try {
      const j = (await res.json()) as { error?: string };
      if (typeof j.error === "string") detail = ` ${j.error}`;
    } catch {
      /* ignore */
    }
    return NextResponse.json(
      {
        error: `Form service returned ${res.status}.${detail}`.trim(),
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
