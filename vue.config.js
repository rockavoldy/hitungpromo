module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/hitungpromo/" : "/",
  pwa: {
    name: "Hitung Promo",
    themeColor: "#f7fafc",
    msTileColor: "#f7fafc",
    appleMobileWebAppCache: "yes",
    manifestOptions: {
      start_url: "./index.html",
      display: "standalone",
      background_color: "#f7fafc",
    },
  },
};
