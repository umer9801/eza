// EZA Logistics - Vite Configuration
// Using vite-tanstack-config which includes:
//   - TanStack devtools (dev-only), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//   - nitro (build-only using cloudflare as default target), VITE_* env injection, @ path alias,
//   - React/TanStack dedupe, error logger plugins
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
});
