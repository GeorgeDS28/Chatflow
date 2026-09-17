import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Vite 8 uses lightningcss by default, which does not process Tailwind.
  // PostCSS is required for @tailwind / @apply directives.
  css: {
    transformer: "postcss",
  },
});
