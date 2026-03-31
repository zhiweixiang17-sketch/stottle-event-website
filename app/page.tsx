import Image from "next/image";

export default function Home() {
  const featuredImages = [
    {
      filename: "IMG_0143.JPG",
      title: "Main Event Hall",
      note: "A welcoming space for celebrations",
    },
    {
      filename: "Stottle Logo - Bottle Only.jpg",
      title: "Private Lounge",
      note: "Perfect for tastings and gatherings",
    },
    {
      filename: "lacey front.jpg",
      title: "Garden & Patio",
      note: "Bright outdoor moments and photos",
    },
  ] as const;

  return (
    <main className="bg-white dark:bg-black">
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-24">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex w-fit items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">
              Stottle Winery · Tastings · Events
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
              Stottle Winery: a place to taste, celebrate, and gather.
            </h1>
            <p className="max-w-xl text-pretty text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              Discover our wines in a welcoming tasting room, then host your
              next event in spaces designed for memorable moments.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/booking"
                className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-white"
              >
                Book an Event
              </a>
              <a
                href="/gallery"
                className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                View the gallery
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
              Our story
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Family-owned",
                  value: "A passion passed down",
                  note: "Warm hospitality, every visit",
                },
                {
                  title: "Curated tastings",
                  value: "Thoughtful pairings",
                  note: "Learn what you love, at your pace",
                },
                {
                  title: "Designed to gather",
                  value: "Events made easy",
                  note: "From small celebrations to big moments",
                },
                {
                  title: "A modern welcome",
                  value: "Clean, bright spaces",
                  note: "Let your event shine with great flow",
                },
              ].map((item) => (
            <div
                  key={item.title}
                  className="rounded-2xl border border-zinc-200/70 bg-white p-4 dark:border-white/10 dark:bg-black/20"
                >
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                    {item.title}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-white">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-zinc-200/70 bg-white p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-sm font-medium text-zinc-900 dark:text-white">
                Ready to plan your visit or event?
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                Share your date and details. We’ll confirm availability and
                recommend the best space for your occasion.
              </p>
              <a
                href="/booking"
                className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-white"
              >
                Book an Event
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
              Event places
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              Three spaces loved by guests. Use the images as placeholders and
              swap in your final photos when you’re ready.
            </p>
          </div>
          <a
            href="/booking"
            className="w-fit rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            Request availability
          </a>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredImages.map((img, idx) => (
            <figure
              key={img.filename}
              className="group overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-sm transition-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={`/images/${encodeURIComponent(img.filename)}`}
                  alt={img.title}
                  fill
                  priority={idx === 0}
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="p-5">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {img.title}
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  {img.note}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200/70 bg-white dark:border-white/10 dark:bg-black">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            Tasting Room locations
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Main Tasting Room",
                text: "123 Winery Lane · Hours: Wed–Sun, 12–6 (replace with your address)",
              },
              {
                title: "Garden Patio",
                text: "456 Vineyard Ave · Hours: Thu–Sun, 1–5 (replace with your hours)",
              },
              {
                title: "Private Tastings",
                text: "By appointment · We’ll plan the experience around your group",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <p className="text-base font-semibold text-zinc-900 dark:text-white">
                  {card.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
