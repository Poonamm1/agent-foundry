import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/agent-foundry/",
  test: {
    environment: "jsdom",
  },
});
