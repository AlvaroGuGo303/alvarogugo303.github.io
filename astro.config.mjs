import { defineConfig } from "astro/config";
import robotsTxt from "astro-robots-txt";
import tailwindcss from "@tailwindcss/vite";
import { SITE_URL as SITE } from "./src/consts.ts";

// La URL del sitio vive en src/consts.ts (SITE_URL). Desde aquí alimenta
// canonical, OG image y el sitemap (src/pages/sitemap.xml.ts). Al desplegar en
// GitHub Pages, el workflow (.github/workflows/astro.yml) pasa --site y --base
// automáticamente, así que en producción no hace falta tocar nada aquí.

// https://astro.build/config
export default defineConfig({
  integrations: [robotsTxt({ sitemap: `${SITE}sitemap.xml` })],
  site: SITE,
  base: "/",
  vite: {
    plugins: [tailwindcss()], // Tailwind v4 vía plugin de Vite (soportado en build con Astro 7)
    server: {
      force: true, // Forzar la recarga sin usar la caché
    },
    resolve: {
      alias: {
        "@": "/src", // alias "@" -> carpeta "src"
      },
    },
  },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
