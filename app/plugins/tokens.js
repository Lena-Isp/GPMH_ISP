import { color } from "@/components/tokens/colors";
import { font } from "@/components/tokens/fonts";
import { iconName, iconSize } from "@/components/tokens/icons";
import { typographyVariant } from "@/components/tokens/typography";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      color: color,
      font: font,
      iconName: iconName,
      iconSize: iconSize,
      typographyVariant: typographyVariant,
    },
  };
});