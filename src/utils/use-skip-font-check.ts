// 强制跳过字体加载检查，确保按键标签始终渲染（中文字体常导致 document.fonts.check 返回 false）
// 如果将来需要回退，只需把返回值改成基于环境判断的布尔值。
export const useSkipFontCheck = (): boolean => {
  return true;
};
