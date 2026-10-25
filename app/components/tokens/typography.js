/*
Добавление типографики:
- в файл '/components/ui/Typography/index' добавить классы(соответствующие названию в дизайне) и стили
- тут по аналогии добавить переменные
Использование в компонентaх:
<Text
  tag="h1"
  :variant="$typographyVariant.T_NORMAL_30"
  :font="$font.TTSMALLS_REGULAR"
  :color="$color.WHITE"
>{{ $t('home.index') }}</Text>
*/

export const typographyVariant = {
  T_H0_60_MOB: "t-h0_60-mob", 
  T_H0_250: "t-h0_250",

  T_H1_55_MOB: "t-h1_55-mob", 
  T_H1_150: "t-h1_150",

  T_H2_50_MOB: "t-h2_50-mob",
  T_H2_100: "t-h2_100",

  T_H3_40_MOB: "t-h3_40-mob",
  T_H3_60: "t-h3_60",

  T_H4_24_MOB: "t-h4_24-mob",
  T_H4_36: "t-h4_36",

  T_SUPER_BIG_30_MOB: "t-super_big_30-mob",
  T_SUPER_BIG_60: "t-super_big_60",

  T_SUPER_BIG_27_MOB: "t-super_big_27-mob",
  T_SUPER_BIG_50: "t-super_big_50",

  T_BIG_24_MOB: "t-big_24-mob",
  T_BIG_36: "t-big_36",

  T_NORMAL_20_MOB: "t-normal_20-mob",
  T_NORMAL_30: "t-normal_30",

  T_NORMAL_18_MOB: "t-normal_18-mob",
  T_NORMAL_24: "t-normal_24",

  T_SMALL_16_MOB: "t-small_16-mob",
  T_SMALL_20: "t-small_20",

  T_SUPER_SMALL_14_MOB: "t-super_small_14-mob",
  T_SUPER_SMALL_16: "t-super_small_16",

  T_BUTTON_24: "t-button",
  
  T_LINKS_20: "t-links",


  /*DOP*/
  T_MENU: "t-menu", // 24px/20px
};

export default {
  typographyVariant,
};