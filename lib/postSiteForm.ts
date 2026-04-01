type SiteFormPath = "/api/contact" | "/api/booking";

export async function postSiteForm(
  path: SiteFormPath,
  body: Record<string, string>,
): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    const res = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      return { ok: true };
    }

    let message = `Request failed (${res.status}).`;
    try {
      const data = (await res.json()) as { error?: string };
      if (typeof data.error === "string" && data.error.length > 0) {
        message = data.error;
      }
    } catch {
      /* ignore */
    }
    return { ok: false, message };
  } catch {
    return { ok: false, message: "Network error. Please try again." };
  }
}
