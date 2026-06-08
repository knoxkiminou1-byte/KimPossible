import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const rawPort = process.env.PORT ?? "25499";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";
const host = process.env.HOST ?? "0.0.0.0";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          const packagePath = id.split("node_modules/").pop() ?? id;
          if (packagePath.startsWith("framer-motion/")) return "motion";
          if (packagePath.startsWith("lucide-react/")) return "icons";
          if (packagePath.startsWith("@radix-ui/")) return "radix-ui";
          if (packagePath.startsWith("@tanstack/")) return "query";
          if (packagePath.startsWith("date-fns/")) return "date";
          if (packagePath.startsWith("recharts/")) return "charts";
          if (
            packagePath.startsWith("react/") ||
            packagePath.startsWith("react-dom/") ||
            packagePath.startsWith("scheduler/")
          ) {
            return "react-core";
          }
          return "vendor";
        },
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host,
    allowedHosts: true,
    fs: {
      strict: false,
    },
  },
  preview: {
    port,
    host,
    allowedHosts: true,
  },
});
