import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./en.json";
import ukTranslation from "./uk.json";

i18n.use(initReactI18next).init({
  resources: {
    en: enTranslation,
    uk: ukTranslation,
  },
  lng: localStorage.getItem("lng") || "uk", // мова за замовчуванням
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
