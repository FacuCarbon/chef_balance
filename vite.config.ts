import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

declare const process: {
  env: Record<string, string | undefined>;
};

function resolveSiteUrl() {
  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (productionUrl) {
    return `https://${productionUrl.replace(/\/$/, "")}`;
  }

  const explicitUrl = process.env.VITE_SITE_URL?.trim();
  if (explicitUrl) {
    return explicitUrl.replace(/\/$/, "");
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return `https://${vercelUrl.replace(/\/$/, "")}`;
  }

  return "";
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: "html-site-url",
      transformIndexHtml(html) {
        const siteUrl = resolveSiteUrl();
        return html.replaceAll("__SITE_URL__", siteUrl);
      }
    },
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "Chef Balance",
        short_name: "Chef Balance",
        description: "Maqueta mobile-first para calcular costos, margen y precio sugerido de recetas.",
        lang: "es",
        theme_color: "#904935",
        background_color: "#FDF7F4",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/pwa-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    })
  ]
});
