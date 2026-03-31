"use client";

import { useMemo, useState } from "react";
import BookingCalendar from "./BookingCalendar";
import BookingForm from "./BookingForm";

function isoDateFromParts(year: number, monthIndex: number, day: number) {
  const d = new Date(year, monthIndex, day);
  const yearStr = d.getFullYear();
  const monthStr = String(d.getMonth() + 1).padStart(2, "0");
  const dayStr = String(d.getDate()).padStart(2, "0");
  return `${yearStr}-${monthStr}-${dayStr}`;
}

function getInitialBookedDates() {
  const now = new Date();
  const year = now.getFullYear();
  const monthIndex = now.getMonth();

  // Seed a few booked dates so the calendar is meaningful immediately.
  // Replace with real data later.
  return [
    isoDateFromParts(year, monthIndex, 5),
    isoDateFromParts(year, monthIndex, 12),
    isoDateFromParts(year, monthIndex, 20),
  ];
}

export default function BookingAvailability() {
  const initialBooked = useMemo(() => getInitialBookedDates(), []);
  const [bookedDates, setBookedDates] = useState<Set<string>>(
    () => new Set(initialBooked)
  );

  function handleBookedDate(dateISO: string | null | undefined) {
    if (!dateISO) return;
    setBookedDates((prev) => {
      const next = new Set(prev);
      next.add(dateISO);
      return next;
    });
  }

  return (
    <div className="space-y-5">
      <BookingCalendar bookedDates={bookedDates} />
      <BookingForm onSuccessBookedDate={handleBookedDate} />
    </div>
  );
}

