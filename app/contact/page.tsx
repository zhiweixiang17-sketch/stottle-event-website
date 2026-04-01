import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact",
};

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

          <ContactForm />
        </div>
      </section>
    </main>
  );
}

