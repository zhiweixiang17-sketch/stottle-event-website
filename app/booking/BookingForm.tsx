"use client";

import { useMemo, useState, type FormEvent } from "react";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

export default function BookingForm({
  onSuccessBookedDate,
}: {
  onSuccessBookedDate?: (dateISO: string | null) => void;
}) {
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  // Configure this to your form service endpoint.
  // Example (Formspree): "https://formspree.io/f/xxxxxxx"
  const endpoint = useMemo(() => {
    return process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!endpoint) {
      setSubmitState({
        status: "error",
        message:
          "Form service endpoint is not set. Add NEXT_PUBLIC_FORMSPREE_ENDPOINT in your environment.",
      });
      return;
    }

    setSubmitState({ status: "submitting" });

    const formData = new FormData(e.currentTarget);
    const submittedEventDate = formData.get("eventDate")?.toString() ?? null;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!res.ok) {
        setSubmitState({
          status: "error",
          message:
            "Sorry—your request couldn’t be sent. Please try again in a moment.",
        });
        return;
      }

      setSubmitState({ status: "success" });
      onSuccessBookedDate?.(submittedEventDate);
      e.currentTarget.reset();
    } catch {
      setSubmitState({
        status: "error",
        message:
          "Network error while sending your request. Please try again.",
      });
    }
  }

  return (
    <form
      className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
      action="#"
      method="post"
      onSubmit={onSubmit}
    >
      {submitState.status === "success" ? (
        <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-900/30 dark:bg-emerald-900/15 dark:text-emerald-100">
          Thanks! Your booking request was sent. We’ll get back to you by email soon.
        </div>
      ) : null}

      {submitState.status === "error" ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900 dark:border-red-900/30 dark:bg-red-900/15 dark:text-red-100">
          {submitState.message}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-900 dark:text-white">
            Name
          </span>
          <input
            name="name"
            required
            className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 shadow-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-400 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white/20"
            placeholder="Your name"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-900 dark:text-white">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 shadow-sm outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white/20"
            placeholder="you@example.com"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-900 dark:text-white">
            Phone
          </span>
          <input
            type="tel"
            name="phone"
            required
            inputMode="tel"
            className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 shadow-sm outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white/20"
            placeholder="(555) 123-4567"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-900 dark:text-white">
            Event date
          </span>
          <input
            type="date"
            name="eventDate"
            required
            className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-400 dark:border-white/10 dark:bg-black/20 dark:text-white dark:focus:border-white/20"
          />
        </label>
      </div>

      <div className="mt-5">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-900 dark:text-white">
            Message
          </span>
          <textarea
            name="message"
            rows={5}
            required
            className="resize-y rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white/20"
            placeholder="What are you planning? Include any setup needs or questions."
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
          We’ll reply by email with availability and next steps.
        </p>
        <button
          type="submit"
          disabled={submitState.status === "submitting"}
          className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-white"
        >
          {submitState.status === "submitting" ? "Sending..." : "Send request"}
        </button>
      </div>
    </form>
  );
}

