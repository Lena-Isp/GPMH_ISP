/*
  Добавление новых шрифтов:
  - в папку assets/fonts добавить шрифты(формат - woff, woff2, ttf)
  - в файле assets/scss/base/fonts прописать пути к шрифтам и название шрифтов
  - тут по аналогии добавить переменные
  Использование в компонентaх:
  - $font.TTSMALLS_REGULAR
*/

export const stylesFonts = `
  --font-ttsmalls-regular: 'TTSmallsRegular', Arial, sans-serif;
  --font-ttsmalls-medium: 'TTSmallsMedium', Arial, sans-serif;
  --font-ttsmalls-demibold: 'TTSmallsDemibold', Arial, sans-serif;
  --font-maregraphe-regular: 'MaregrapheRegular', Arial, sans-serif;
  --font-maregraphe-bold: 'MaregrapheBold', Arial, sans-serif;
`;

export const font = {
  TTSMALLS_REGULAR: "var(--font-ttsmalls-regular)",
  TTSMALLS_MEDIUM: "var(--font-ttsmalls-medium)",
  TTSMALLS_DEMIBOLD: "var(--font-ttsmalls-demibold)",
  MAREGRAPHE_REGULAR: "var(--font-maregraphe-regular)",
  MAREGRAPHE_BOLD: "var(--font-maregraphe-bold)",
};

export default {
  font,
  stylesFonts,
};
