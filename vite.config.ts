import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/framawork-team-test-task/',
  plugins: [react()],
  build: {
    outDir: 'build'
  },
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    mockReset: true,
  },
});
