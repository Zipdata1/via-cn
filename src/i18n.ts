import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ICU from "i18next-icu";
import en from "./locales/en/translation.json";
import zh from "./locales/zh/translation.json";

i18n
  .use(ICU)
  .use(initReactI18next)
  .init({
    // 强制默认使用中文；等全站替完文案后再删掉本行，恢复自动检测
    lng: "zh",
    fallbackLng: "en",
    supportedLngs: ["en", "zh"],
    resources: {
      en: { translation: en },
      zh: { translation: zh },
    },
    interpolation: { escapeValue: false },
    returnEmptyString: false,
  });

export default i18n;