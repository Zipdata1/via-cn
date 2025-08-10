import "./i18n";
import '@webscopeio/react-textarea-autocomplete/style.css';
import { createRoot } from 'react-dom/client';
import './app.global.css';
import Root from './containers/Root';
import { updateCSSVariables } from './utils/color-math';
import {
  getThemeModeFromStore,
  getThemeNameFromStore,
} from './utils/device-store';
import { THEMES } from './utils/themes';
import { ThemeProvider } from 'styled-components';

// 解析并兜底主题名称，确保一定命中 THEMES 的 key
function resolveSafeThemeName(): keyof typeof THEMES {
  const name = getThemeNameFromStore() as keyof typeof THEMES | undefined;
  if (name && Object.prototype.hasOwnProperty.call(THEMES, name)) return name;
  const keys = Object.keys(THEMES);
  const darkLike = keys.find(k => /dark|深|darken/i.test(k));
  return (darkLike ?? keys[0]) as keyof typeof THEMES;
}

const elem = document.getElementById('root');
if (elem) {
  const root = createRoot(elem);

  const themeName = resolveSafeThemeName();
  const theme = THEMES[themeName];              // 保证非 undefined

  // 继续沿用你原来的 CSS 变量与模式数据集
  document.documentElement.dataset['themeMode'] = getThemeModeFromStore();
  updateCSSVariables(themeName);

  root.render(
    <ThemeProvider theme={theme}>
      <Root />
    </ThemeProvider>
  );
}
