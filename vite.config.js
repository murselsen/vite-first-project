import { defineConfig } from "vite";

export default defineConfig({
  // Projenin kök dizini
  root: process.cwd(),

  // Geliştirme veya üretim ortamında hizmet verilirken kullanılacak temel genel yol
  base: "/",

  // Düz statik varlıklar olarak hizmet verilecek dizin
  publicDir: "public",

  // Derleme seçenekleri
  build: {
    sourcemap: true,
    // Çıkış dizini
    outDir: "dist",
    // Daha hızlı derlemeler için önbellek dosyalarının kaydedileceği dizin
    cacheDir: "node_modules/.vite",
    // Küçültme işlemini etkinleştirme/devre dışı bırakma
    minify: "esbuild", // veya 'terser' veya false
    // Rollup seçenekleri
    rollupOptions: {
      // Harici bağımlılıklar
      external: [],
      // Çıkış seçenekleri
      output: {
        // Manuel parçalara ayırma
        manualChunks: undefined,
        // Giriş dosyası adları
        entryFileNames: "assets/[name].js",
        // Parça dosyası adları
        chunkFileNames: "assets/[name].js",
        // Varlık dosyası adları
        assetFileNames: "assets/[name].[ext]",
      },
    },
    // Parça boyutu uyarı limiti
    chunkSizeWarningLimit: 500,
  },

  // Geliştirme sunucusu seçenekleri
  server: {
    // Sunucu adı
    host: "localhost",
    // Sunucu portu
    port: 3000,
    // Sunucu başlatıldığında tarayıcıyı açma
    open: true,
    // CORS'u etkinleştirme
    cors: true,
    // İstekleri proxy'leme
    proxy: {
      "/api": {
        target: "http://backend.local",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

  // Eklenti seçenekleri
  plugins: [],

  // Çözümleyici seçenekleri
  resolve: {
    alias: {
      "@": "/src",
    },
    dedupe: [],
  },

  // CSS seçenekleri
  css: {
    // CSS modüllerini etkinleştirme
    modules: {
      scopeBehaviour: "local",
      globalModulePaths: [],
    },
    // PostCSS yapılandırması
    postcss: {},
    // Ön işlemci seçenekleri
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`,
      },
    },
  },

  // JSON seçenekleri
  json: {
    // JSON dosyaları için adlandırılmış dışa aktarımlar
    namedExports: true,
    // JSON5 desteğini etkinleştirme/devre dışı bırakma
    stringify: false,
  },

  // Ortam değişkenleri öneki
  envPrefix: "VITE_",

  // Günlük düzeyi
  logLevel: "info",

  // Geliştirme sunucusu başlatıldığında ekranı temizleme
  clearScreen: true,
});
