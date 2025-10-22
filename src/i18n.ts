import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import idHeader from "./locales/id/header.json";
import enHeader from "./locales/en/header.json";
import idHero from "./locales/id/hero.json";
import enHero from "./locales/en/hero.json";
import idPrograms from "./locales/id/programs.json";
import enPrograms from "./locales/en/programs.json";
import idNews from "./locales/id/news.json";
import enNews from "./locales/en/news.json";
import idAbout from "./locales/id/about.json";
import enAbout from "./locales/en/about.json";
import idFooter from "./locales/id/footer.json";
import enFooter from "./locales/en/footer.json";
import idContact from "./locales/id/contact.json"; // ✅ baru
import enContact from "./locales/en/contact.json"; // ✅ baru
import enHomeAbout from "./locales/en/homeAbout.json"; // ✅ baru
import idHomeAbout from "./locales/id/homeAbout.json"; // ✅ baru
import idClientAndPorto from "./locales/id/clientAndPorto.json"; // ✅ baru
import enClientAndPorto from "./locales/en/clientAndPorto.json"; // ✅ baru

i18n.use(initReactI18next).init({
  resources: {
    en: {
      header: enHeader,
      hero: enHero,
      programs: enPrograms,
      news: enNews,
      about: enAbout,
      footer: enFooter,
      contact: enContact,
      homeAbout: enHomeAbout, // ✅ tambahkan
      clientAndPorto: enClientAndPorto, // ✅ tambahkan
    },
    id: {
      header: idHeader,
      hero: idHero,
      programs: idPrograms,
      news: idNews,
      about: idAbout,
      footer: idFooter,
      contact: idContact,
      homeAbout: idHomeAbout,
      clientAndPorto: idClientAndPorto, // ✅ tambahkan
    },
  },
  lng: "id",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
