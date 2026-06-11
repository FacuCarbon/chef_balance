import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Chef Balance",
        short_name: "Chef Balance",
        description: "Maqueta mobile-first para calcular costos, margen y precio sugerido de recetas.",
        theme_color: "#904935",
        background_color: "#FDF7F4",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/chef-logo.jpg",
            sizes: "512x512",
            type: "image/jpeg",
            purpose: "any maskable"
          }
        ]
      }
    })
  ]
});
