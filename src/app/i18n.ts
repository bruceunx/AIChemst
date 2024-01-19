import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18nConfig from "../../i18nConfig";

const resources = {
  en: {
    translation: {
      hello: "hello",
      welcome: "welcome",
    },
  },
  zh: {
    translation: {
      hello: "你好",
      welcome: "欢迎",
    },
  },
};

i18n.use(initReactI18next).init({
  lng: "zh",
  resources,
  fallbackLng: i18nConfig.defaultLocale,
  supportedLngs: i18nConfig.locales,
});

export default i18n;
