/*
  stylesColors - это css-переменные, которые добавлены в styles
  color - название переменных которые используются в компонентах
  Использование в scss:
  - var(--color-C_2758))
  Использование в компонентaх:
  - $color.C_2758
  Доп инфо:
  color-GRAY_LINE - rgba(147, 147, 147, .5) = rgba(#939393, .5)
  --color-WHITE_LINE - rgba(255, 255, 255, .2) = rgba(#fff, .5)
*/

export const stylesColors = `
  --color-WHITE: #fff;
  --color-FON: #121419;
  --color-GRAY: #939393;
  --color-GRAY_LINE: rgba(147, 147, 147, .5);
  --color-BLACK: #0f0f0f;
  --color-WHITE_LINE: rgba(255, 255, 255, .2);
  --color-C_2758: #002864;
  --color-C_285: #0082FF;
  --color-C_2925: #00BEFF;
  --color-C_2101: #917DFF;
  --color-C_636: #00F0FA;
  --color-C_2728: #2346A5;
  --color-C_2736: #5050D2;
  --color-C_2726: #5055EB;
  `;

export const color = {
  WHITE: "var(--color-WHITE)",
  FON: "var(--color-FON)",
  GRAY: "var(--color-GRAY)",
  GRAY_LINE: "var(--color-GRAY_LINE)",
  BLACK: "var(--color-BLACK)",
  WHITE_LINE: "var(--color-WHITE_LINE)",
  C_2758: "var(--color-C_2758)",
  C_285: "var(--color-C_285)",
  C_2925: "var(--color-C_2925)",
  C_2101: "var(--color-C_2101)",
  C_636: "var(--color-C_636)",
  C_2728: "var(--color-C_2728)",
  C_2736: "var(--color-C_2736)",
  C_2726: "var(--color-C_2726)",
};

export default {
  color,
  stylesColors,
};
