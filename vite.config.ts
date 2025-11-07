import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "localhost",
    port: 5173,
  },
  preview: {
    host: "0.0.0.0",
    port: process.env.PORT || 8080,
    allowedHosts: ["cardakyazilimnew-production.up.railway.app"],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

