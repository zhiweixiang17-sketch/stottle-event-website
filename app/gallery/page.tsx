import Image from "next/image";
import fs from "node:fs";
import path from "node:path";

export const metadata = {
  title: "Gallery",
};

const ALLOWED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
]);

function getPublicImageFilenames(): string[] {
  const imagesDir = path.join(process.cwd(), "public", "images");

  let files: string[] = [];
  try {
    files = fs.readdirSync(imagesDir);
  } catch {
    return [];
  }

  return files
    .filter((file) => file !== ".DS_Store")
    .filter((file) => !file.startsWith("."))
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return ALLOWED_EXTENSIONS.has(ext);
    })
    .sort((a, b) => a.localeCompare(b));
}

function titleFromFilename(filename: string) {
  const withoutExt = filename.replace(path.extname(filename), "");
  return withoutExt.replace(/[_-]+/g, " ").trim();
}

export default function GalleryPage() {
  const images = getPublicImageFilenames();

  return (
    <main className="bg-white dark:bg-black">
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            Gallery
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
            All images found in <span className="font-medium">public/images</span>{" "}
            are shown here.
          </p>
        </div>

        {images.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-zinc-200/70 bg-white p-6 text-sm text-zinc-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
            No images found in <span className="font-medium">public/images</span>.
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((filename, idx) => (
              <figure
                key={filename}
                className="group overflow-hidden rounded-3xl border border-zinc-200/70 bg-white shadow-sm transition-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={`/images/${encodeURIComponent(filename)}`}
                    alt={titleFromFilename(filename)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    priority={idx === 0}
                  />
                </div>
                <figcaption className="p-5">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {titleFromFilename(filename)}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="mt-12 rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Want to add more photos?
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            Add image files to <span className="font-medium">public/images</span>, then refresh the page.
          </p>
          <a
            href="/booking"
            className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-white"
          >
            Request a booking
          </a>
        </div>
      </section>
    </main>
  );
}

