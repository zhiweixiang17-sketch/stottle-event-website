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
  const phone = String(body.phone ?? "").trim();
  const eventDate = String(body.eventDate ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !phone || !eventDate || !message) {
    return NextResponse.json(
      { error: "All fields are required." },
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
      phone,
      eventDate,
      message,
      _subject: "Booking request — Stottle Event Space",
      form_source: "booking_page",
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
