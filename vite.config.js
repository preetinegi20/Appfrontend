import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // ✅ Ensures assets load correctly in production
  server: {
    port: process.env.PORT || 5173, // ✅ Allows Railway to assign a port
    host: "0.0.0.0", // ✅ Required for Railway to expose the server
  },
});
