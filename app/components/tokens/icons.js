/*
  Добавление новых иконок svg:
  - в папку assets/svg/icon добавить иконки svg
  - в iconName добавить название иконки соответствующее названию в папке
  - в iconSize добавить класс размера из компонента IconSvg
  Использование в компонентaх:
  <IconSvg
    :name="$iconName.ARROW_UP" 
    :size="[$iconSize.LARGE, $iconSize.NEW_MEDIUM_MOB]"
    :color="$color.WHITE"
  />
*/

export const iconName = {
  ARROW_UP: "arrow-up",
  ARROW_DOWN: "arrow-down",
  CROSS: "cross",
  CROSS_MOB_MENU: "cross-mob-menu",
  ARROW_TOP: "arrow-top",
  ARROW_LEFT: "arrow-left",
  ARROW_RIGHT: "arrow-right",
  PLUS: "plus",
  ARROW_GALLERY_LEFT: "arrow-gallery-left",
  ARROW_GALLERY_RIGHT: "arrow-gallery-right",
  SEARCH_ICON: "search-icon",
  //иконки для плеера
  PLAY: "play",
  STOP: "stop",
  LOGO_RU: "logo-ru",
  LOGO_EN: "logo-en",
};

export const iconSize = {
  SMALL_MOB: "small--mob", //20*20
  SMALL: "small", //20*20
  SPEC_SMALL_MOB: "spec-small--mob", //40*20
  SPEC_SMALL: "spec-small", //40*20
  MEDIUM_MOB: "medium--mob", //40*40
  MEDIUM: "medium", //40*40
  SPEC_MEDIUM_MOB: "spec-medium--mob", //80*40
  SPEC_MEDIUM: "spec-medium", //80*40
  LARGE_MOB: "large--mob", //80*80
  LARGE: "large", //80*80
  //ДОП РАЗМЕРЫ
  SMALL_CROSS_MOB: "small-cross-mob", //16*16 (для мобильного меню)
  SMALL_CROSS: "small-cross", //16*16 (для мобильного меню)
  MEGA_LARGE_MOB: "mega-large--mob", //140*140 (для иконок плеера)
  MEGA_LARGE: "mega-large", //140*140 (для иконок плеера)
  SMALL_PREV_MOB: "small-prev--mob", //20*10
  SMALL_PREV: "small-prev", //20*10
  MEDIUM_SEARCH: "medium-search", //30*30
  LOGO_SIZE: "logo-size", //216*auto (для десктопного меню)
  //NEW_DESIGN
  NEW_MEDIUM_MOB: "new-medium--mob", //32*32
  NEW_MEDIUM: "new-medium", //32*32
};

export default {
  iconName,
  iconSize,
};