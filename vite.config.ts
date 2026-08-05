import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    tanstackStart({
      server: { entry: "server" },
      // Explicitly specify router entry with full configuration
      router: { 
        entry: "router",
      },
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
    alias: {
      "~": __dirname,
    },
  },
});
