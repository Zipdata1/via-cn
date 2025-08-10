import React, { type FC } from 'react';
import { ColorPicker } from '../../../../inputs/color-picker';
import { ControlRow, Label, Detail } from '../../../grid';
import {
  getLightingDefinition,
  isVIADefinitionV2,
  LightingValue,
  type VIADefinitionV2,
  type VIADefinitionV3,
} from '@the-via/reader';
import { LightingControl, type ControlMeta } from './lighting-control';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { getSelectedLightingData, updateBacklightValue, updateCustomColor } from 'src/store/lightingSlice';
import { getSelectedDefinition } from 'src/store/definitionsSlice';

// === i18n fallback: lighting effect labels (module-level) ===
const __EFFECT_LABELS: Record<string, string> = {
  solid_color: '纯色',
  light: '轻柔',
  breathing: '呼吸',
  rainbow: '彩虹',
  rainbow_swirl: '彩虹旋涡',
  rainbow_mood: '彩虹心情',
  cycle_all: '全区循环',
  cycle_left_right: '左右循环',
  cycle_up_down: '上下循环',
  static_gradient: '静态渐变',
  gradient: '渐变',
  reactive: '触发渐变',
  reactive_simple: '触发（简）',
  reactive_crossfade: '触发（淡入淡出）',
  ripple: '涟漪',
  raindrops: '雨滴',
  snake: '贪吃蛇',
  knight: '骑士巡逻',
  twinkle: '闪烁',
  jellybean_raindrops: '彩豆雨滴',
  typing_heatmap: '打字热力图',
};
export function __trEffectLabel(label: string): string {
  return __EFFECT_LABELS[label] ?? label.replace(/_/g, ' ');
}
// === end i18n fallback ===

// Build options from keyboard definition at runtime
const getEffectOptions = (d: VIADefinitionV2 | VIADefinitionV3) => {
  if (!isVIADefinitionV2(d)) return [];
  const def = getLightingDefinition(d.lighting);
  const list = (def as any).effects as Array<[string, number]> | undefined;
  if (!list) return [];
  return list.map(([label]) => __trEffectLabel(label));
};

const getUnderglowEffectOptions = (d: VIADefinitionV2 | VIADefinitionV3) => {
  if (!isVIADefinitionV2(d)) return [];
  const def = getLightingDefinition(d.lighting);
  const list = ((def as any).underglowEffects ?? (def as any).effects) as Array<[string, number]> | undefined;
  if (!list) return [];
  return list.map(([label]) => __trEffectLabel(label));
};

const BacklightControls: ControlMeta[] = [
  [LightingValue.BACKLIGHT_BRIGHTNESS, '亮度', { type: 'range', min: 0, max: 255 }],
  [LightingValue.BACKLIGHT_EFFECT, '效果', { type: 'options', getOptions: getEffectOptions }],
  [LightingValue.BACKLIGHT_EFFECT_SPEED, '效果速度', { type: 'range', min: 0, max: 255 }],
];

const UnderglowControls: ControlMeta[] = [
  [LightingValue.QMK_RGBLIGHT_BRIGHTNESS, '底光亮度', { type: 'range', min: 0, max: 255 }],
  [LightingValue.QMK_RGBLIGHT_EFFECT, '底光效果', { type: 'options', getOptions: getUnderglowEffectOptions }],
  [LightingValue.QMK_RGBLIGHT_EFFECT_SPEED, '效果速度', { type: 'range', min: 0, max: 255 }],
];

export const GeneralPane: FC = () => {
  const dispatch = useAppDispatch();
  const selectedDefinition = useAppSelector(getSelectedDefinition);
  const lightingData = useAppSelector(getSelectedLightingData);

  if (!selectedDefinition || !lightingData) return null;
  if (!isVIADefinitionV2(selectedDefinition)) {
    throw new Error('此灯光组件仅兼容 v2 版本的键盘定义');
  }

  const lightingDefinition = getLightingDefinition(selectedDefinition.lighting);
  const { supportedLightingValues } = lightingDefinition;

  // Backlight controls
  const backlightControls = BacklightControls.filter(([cmd]) => supportedLightingValues.indexOf(cmd) !== -1)
    .map((meta) => <LightingControl key={`b-${meta[0]}`} meta={meta} />);

  // Underglow controls
  const underglowControls = UnderglowControls.filter(([cmd]) => supportedLightingValues.indexOf(cmd) !== -1)
    .map((meta) => <LightingControl key={`u-${meta[0]}`} meta={meta} />);

  // Determine whether to show custom color slots for backlight effects
  const currentEffect = lightingData[LightingValue.BACKLIGHT_EFFECT];
  const currentUnderglowEffect = lightingData[LightingValue.QMK_RGBLIGHT_EFFECT];
  const colorNeeded =
    currentEffect && currentEffect.length > 1 && currentEffect[1] === 1;
  const underglowColorNeeded =
    currentUnderglowEffect && currentUnderglowEffect.length > 1 && currentUnderglowEffect[1] === 1;

  const useCustomColors = !!(lightingData as any).customColors;
  const showCustomColors = useCustomColors && colorNeeded;

  return (
    <>
      {backlightControls}
      {showCustomColors &&
        [LightingValue.BACKLIGHT_COLOR_1, LightingValue.BACKLIGHT_COLOR_2].map(
          (command: LightingValue, idx: number) => {
            const valArr = lightingData[command];
            let color: {hue: number; sat: number} | undefined;
            let setColor: (h: number, s: number) => void;
            if ((lightingData as any).customColors) {
              color = (lightingData as any).customColors[idx] as {hue:number; sat:number};
              setColor = (h: number, s: number) => dispatch(updateCustomColor(idx, h, s));
            } else if (valArr) {
              color = {hue: valArr[0], sat: valArr[1]};
              setColor = (h: number, s: number) => dispatch(updateBacklightValue(command, h, s));
            } else {
              return null;
            }
            return (
              <ControlRow key={command}>
                <Label>颜色 {idx + 1}</Label>
                <Detail>
                  {color ? <ColorPicker color={color} setColor={setColor} /> : null}
                </Detail>
              </ControlRow>
            );
          },
        )}
      {underglowControls}
      {underglowColorNeeded && (
        <LightingControl
          meta={[LightingValue.QMK_RGBLIGHT_COLOR, '底光颜色', { type: 'color' }]}
        />
      )}
    </>
  );
};
