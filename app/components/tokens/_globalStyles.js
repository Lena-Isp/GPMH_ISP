/*
  Здесь добавляются новые объекты в head/styles
*/

import { stylesColors } from "./colors";
import { stylesFonts } from "./fonts";

export const globalStyles = `
  :root {
    ${stylesColors}
    ${stylesFonts}
  }
`;

export default {
  globalStyles,
};