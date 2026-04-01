"use client";

import { postSiteForm } from "@/lib/postSiteForm";
import { useState, type FormEvent, type ReactNode } from "react";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-zinc-900 dark:text-white">
        {label}
      </span>
      {children}
    </label>
  );
}

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitState({ status: "submitting" });

    const formData = new FormData(e.currentTarget);

    const result = await postSiteForm("/api/contact", {
      name: formData.get("name")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      message: formData.get("message")?.toString() ?? "",
      _subject: formData.get("_subject")?.toString() ?? "",
      form_source: formData.get("form_source")?.toString() ?? "",
    });
    if (!result.ok) {
      setSubmitState({ status: "error", message: result.message });
      return;
    }

    setSubmitState({ status: "success" });
    e.currentTarget.reset();
  }

  return (
    <form
      className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
      onSubmit={onSubmit}
    >
      <input type="hidden" name="_subject" value="Contact form — Stottle Event Space" />
      <input type="hidden" name="form_source" value="contact_page" />

      {submitState.status === "success" ? (
        <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-900/30 dark:bg-emerald-900/15 dark:text-emerald-100">
          Thanks! Your message was sent. We’ll get back to you soon.
        </div>
      ) : null}

      {submitState.status === "error" ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900 dark:border-red-900/30 dark:bg-red-900/15 dark:text-red-100">
          {submitState.message}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name">
          <input
            name="name"
            required
            className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 shadow-sm outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white/20"
            placeholder="Your name"
          />
        </Field>

        <Field label="Email">
          <input
            type="email"
            name="email"
            required
            className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 shadow-sm outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white/20"
            placeholder="you@example.com"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message">
          <textarea
            name="message"
            rows={7}
            required
            className="resize-y rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white/20"
            placeholder="What can we help with?"
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
          Prefer a booking request? Use the Booking page instead.
        </p>
        <button
          type="submit"
          disabled={submitState.status === "submitting"}
          className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-white"
        >
          {submitState.status === "submitting" ? "Sending..." : "Send message"}
        </button>
      </div>
    </form>
  );
}
