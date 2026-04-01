/**
 * POST form data to Formspree from the browser.
 * Returns a user-visible error message when the request fails.
 */
export async function postToFormspree(
  endpoint: string,
  formData: FormData,
): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });

    if (res.ok) {
      return { ok: true };
    }

    let formspreeHint = "";
    try {
      const data = (await res.json()) as {
        error?: string;
        errors?: Array<{ message?: string } | string>;
      };
      if (typeof data.error === "string") {
        formspreeHint = ` ${data.error}`;
      } else if (Array.isArray(data.errors) && data.errors.length > 0) {
        const first = data.errors[0];
        const msg =
          typeof first === "string"
            ? first
            : typeof first?.message === "string"
              ? first.message
              : "";
        if (msg) formspreeHint = ` ${msg}`;
      }
    } catch {
      /* ignore non-JSON body */
    }

    if (res.status === 404) {
      return {
        ok: false,
        message:
          "Form URL not found (404). Check that your Formspree link is correct. On Vercel, also confirm NEXT_PUBLIC_FORMSPREE_ENDPOINT is set for Production and redeploy so the new value is included in the build.",
      };
    }

    if (res.status === 403 || res.status === 401) {
      return {
        ok: false,
        message:
          `Form blocked (${res.status}).${formspreeHint} In Formspree, check domain restrictions / spam settings and that the form is active.`.trim(),
      };
    }

    return {
      ok: false,
      message:
        `Could not send your message (${res.status}).${formspreeHint} Try again or email us directly.`.trim(),
    };
  } catch {
    return {
      ok: false,
      message:
        "Network error while sending. If this only happens on the live site, check browser extensions or try another network.",
    };
  }
}
