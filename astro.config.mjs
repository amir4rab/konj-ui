import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import preact from "@astrojs/preact";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact({
      include: ["**/preact/*"],
      exclude: ["**/react/*"],
    }),
    react({
      include: ["**/react/*"],
      exclude: ["**/preact/*"],
    }),
    tailwind(),
  ],
});