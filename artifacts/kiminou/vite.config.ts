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
    // Keep the heavy 3D chunk off the first-paint preload list — it's only
    // needed once a lazy 3D component mounts (after idle), so preloading it
    // just competes for bandwidth during initial render.
    modulePreload: {
      resolveDependencies: (_filename, deps) =>
        deps.filter((dep) => !dep.includes("three3d")),
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          const packagePath = id.split("node_modules/").pop() ?? id;
          // Isolate the 3D stack (three + r3f + drei + postprocessing and their
          // deps) into its own chunk. Every 3D component is lazy-loaded, so this
          // chunk is NOT in the eager entry graph — it loads only when the 3D
          // actually mounts (after idle), keeping it off the first-paint path.
          if (
            packagePath.startsWith("three/") ||
            packagePath.startsWith("three-stdlib/") ||
            packagePath.startsWith("three-mesh-bvh/") ||
            packagePath.startsWith("@react-three/") ||
            packagePath.startsWith("postprocessing/") ||
            packagePath.startsWith("@react-spring/") ||
            packagePath.startsWith("@monogrid/") ||
            packagePath.startsWith("@mediapipe/") ||
            packagePath.startsWith("@use-gesture/") ||
            packagePath.startsWith("camera-controls/") ||
            packagePath.startsWith("detect-gpu/") ||
            packagePath.startsWith("glsl-noise/") ||
            packagePath.startsWith("maath/") ||
            packagePath.startsWith("meshline/") ||
            packagePath.startsWith("stats-gl/") ||
            packagePath.startsWith("stats.js/") ||
            packagePath.startsWith("troika-") ||
            packagePath.startsWith("tunnel-rat/") ||
            packagePath.startsWith("its-fine/") ||
            packagePath.startsWith("suspend-react/") ||
            packagePath.startsWith("react-composer/") ||
            packagePath.startsWith("zustand/")
          ) {
            return "three3d";
          }
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
