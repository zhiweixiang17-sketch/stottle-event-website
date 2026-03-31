import CalendarAvailability from "./CalendarAvailability";

export const metadata = {
  title: "Calendar",
};

export default function CalendarPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Event Calendar
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-600">
            Dates marked in rose are booked. Dates marked in emerald are
            currently available.
          </p>
        </div>

        <CalendarAvailability />
      </section>
    </main>
  );
}

