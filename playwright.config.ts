import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "e2e",
  webServer: { command: "npm run build && npm run start", url: "http://localhost:3000", reuseExistingServer: true, timeout: 180000 },
  use: { baseURL: "http://localhost:3000" },
});
