import BookingForm from "./BookingForm";

export const metadata = {
  title: "Booking",
};

export default function BookingPage() {
  return (
    <main className="bg-white dark:bg-black">
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Booking request
            </h1>
            <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
              Tell us what you’re planning and your preferred date/time. This
              form doesn’t charge anything—it just starts the conversation.
            </p>

            <div className="mt-6 rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Typical rental includes
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                <li>Space access for your selected time window</li>
                <li>Standard tables and chairs (as available)</li>
                <li>Basic setup guidance and cleanup expectations</li>
                <li>Add-ons available (AV, extended hours, etc.)</li>
              </ul>
            </div>
          </div>

          <BookingForm />
        </div>
      </section>
    </main>
  );
}

