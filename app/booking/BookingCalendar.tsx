"use client";

import { useMemo, useState } from "react";

function toISODate(d: Date) {
  // Input[type="date"] uses "YYYY-MM-DD" in local time.
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getMonthDays(viewYear: number, viewMonthIndex: number) {
  const firstDay = new Date(viewYear, viewMonthIndex, 1);
  const lastDay = new Date(viewYear, viewMonthIndex + 1, 0);

  const startOffset = firstDay.getDay(); // 0..6 (Sun..Sat)
  const daysInMonth = lastDay.getDate();

  return { startOffset, daysInMonth };
}

export default function BookingCalendar({
  bookedDates,
}: {
  bookedDates: Set<string>;
}) {
  const [viewDate, setViewDate] = useState(() => new Date());

  const { viewYear, viewMonthIndex } = useMemo(() => {
    return { viewYear: viewDate.getFullYear(), viewMonthIndex: viewDate.getMonth() };
  }, [viewDate]);

  const { startOffset, daysInMonth } = useMemo(
    () => getMonthDays(viewYear, viewMonthIndex),
    [viewYear, viewMonthIndex]
  );

  const monthLabel = useMemo(() => {
    return new Intl.DateTimeFormat(undefined, {
      month: "long",
      year: "numeric",
    }).format(new Date(viewYear, viewMonthIndex, 1));
  }, [viewYear, viewMonthIndex]);

  // 6 weeks grid (42 cells) to keep layout stable.
  const totalCells = 42;
  const cells = Array.from({ length: totalCells }, (_, i) => i);

  function goPrev() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  function goNext() {
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  return (
    <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
            Availability
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
            {monthLabel}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            className="rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            aria-label="Previous month"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={goNext}
            className="rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            aria-label="Next month"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4 text-xs text-zinc-600 dark:text-zinc-300">
          <span className="inline-flex items-center gap-2">
            <span className="h-3.5 w-3.5 rounded bg-rose-600" aria-hidden="true" />
            Booked
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3.5 w-3.5 rounded bg-emerald-50 ring-1 ring-emerald-200" aria-hidden="true" />
            Available
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1 text-center">
        {cells.map((cellIndex) => {
          const dayNumber = cellIndex - startOffset + 1;
          const isInMonth = dayNumber >= 1 && dayNumber <= daysInMonth;

          if (!isInMonth) {
            return <div key={cellIndex} className="h-11" />;
          }

          const date = new Date(viewYear, viewMonthIndex, dayNumber);
          const isoDate = toISODate(date);
          const isBooked = bookedDates.has(isoDate);

          return (
            <div
              key={cellIndex}
              className={[
                "h-11 rounded-xl border text-center text-sm font-semibold flex items-center justify-center",
                isBooked
                  ? "border-rose-200 bg-rose-600 text-white"
                  : "border-emerald-200 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/10 dark:text-emerald-200",
              ].join(" ")}
              aria-label={`${isoDate}: ${isBooked ? "Booked" : "Available"}`}
              title={`${isoDate}: ${isBooked ? "Booked" : "Available"}`}
            >
              {dayNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
}

