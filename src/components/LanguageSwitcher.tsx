import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const val = i18n.language.startsWith("zh") ? "zh" : "en";
  return (
    <label style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
      <span>{t("common.language")}</span>
      <select
        value={val}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        style={{ padding: 4 }}
      >
        <option value="zh">{t("common.chineseSimplified")}</option>
        <option value="en">{t("common.english")}</option>
      </select>
    </label>
  );
}
