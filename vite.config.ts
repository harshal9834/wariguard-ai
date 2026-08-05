import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tanstackStart({
      server: { entry: "server" },
      // Explicitly specify router entry for Vercel compatibility
      router: { entry: "router" },
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: {
    minify: "terser",
  },
  resolve: {
    tsconfigPaths: true,
  },
});
