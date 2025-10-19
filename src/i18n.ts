import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import idHeader from "./locales/id/header.json";
import enHeader from "./locales/en/header.json";
import idHero from "./locales/id/hero.json";
import enHero from "./locales/en/hero.json";
import idPrograms from "./locales/id/programs.json";
import enPrograms from "./locales/en/programs.json";
import enNews from "./locales/en/news.json";
import idNews from "./locales/id/news.json";
import idAbout from "./locales/id/about.json";
import enAbout from "./locales/en/about.json";
import enFooter from "./locales/en/footer.json";
import idFooter from "./locales/id/footer.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      header: enHeader, // ✅ ubah dari "nav" ke "header"
      hero: enHero,
      programs: enPrograms,
      news: enNews, // ✅ ubah dari "nav" ke "header"
      about: enAbout, // ✅ ubah dari "nav" ke "header"
      footer: enFooter, // ✅ ubah dari "nav" ke "header"
    },
    id: {
      header: idHeader, // ✅ ubah dari "nav" ke "header"
      hero: idHero,
      programs: idPrograms,
      news: idNews,
      about: idAbout,
      footer: idFooter,
    },
  },
  lng: "id", // default bahasa
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
