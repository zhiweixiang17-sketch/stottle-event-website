/** @type {import('tailwindcss').Config} */
module.exports = {
  // Ensure `dark:` utilities only activate when we explicitly add `dark` to <html>.
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx,js,jsx}", "./app/**/**/*.{md,mdx}"],
};

