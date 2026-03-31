import type React from "react";

export const metadata = {
  title: "Contact",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
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

export default function ContactPage() {
  return (
    <main className="bg-white dark:bg-black">
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Contact
            </h1>
            <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
              Questions about availability, pricing, or packages? Send a note and
              we’ll get back to you soon.
            </p>

            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  Email
                </p>
                <p className="mt-1 text-base font-semibold text-zinc-900 dark:text-white">
                  info@stottlewinery.com
                </p>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  Send questions about tastings and events.
                </p>
              </div>
              <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  Phone
                </p>
                <p className="mt-1 text-base font-semibold text-zinc-900 dark:text-white">
                  360-515-3657
                </p>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  Call for availability and event questions.
                </p>
              </div>
              <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  Location
                </p>
                <p className="mt-1 text-base font-semibold text-zinc-900 dark:text-white">
                  2641 Willamatte Dr E Ste A, Lacey, WA 98516
                </p>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  For directions, use your preferred map app.
                </p>
              </div>
            </div>
          </div>

          <form
            className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
            action="#"
            method="post"
          >
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
                className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-white"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

