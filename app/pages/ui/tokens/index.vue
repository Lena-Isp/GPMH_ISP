<script setup>
</script>

<template>
<div>
  <br />
  <Text
    tag="a"
    href="https://www.figma.com/design/OptUgmAKrnoawquDh5z5Kh/GPM_SAIT_final_pages_UI_new?node-id=1285-4375&t=vNK088ImYoqikHMG-0"
    target="_blank"
    :variant="$typographyVariant.T_NORMAL_30"
    :font="$font.TTSMALLS_DEMIBOLD"
  > ФИГМА</Text>
  <br /><br /><br />
  
  <Text
    tag="span"
    :variant="$typographyVariant.T_NORMAL_30"
    :font="$font.TTSMALLS_REGULAR"
  > Color</Text>
  <br />
  <div class="color">
    <div class="color__item color__item--WHITE">
      <Text tag="span" :color="$color.BLACK"> 
        WHITE
      </Text>
    </div>
    <div class="color__item color__item--FON">FON</div>
    <div class="color__item color__item--GRAY">GRAY</div>
    <!-- <div class="color__item color__item--GRAY_LINE">GRAY_LINE</div>
    <div class="color__item color__item--BLACK">BLACK</div>
    <div class="color__item color__item--WHITE_LINE">WHITE_LINE</div> -->
  </div>
  <br />
  <div class="color">
    <div class="color__item color__item--C_2758">C_2758</div>
    <div class="color__item color__item--C_285">C_285</div>
    <div class="color__item color__item--C_2925">C_2925</div>
    <div class="color__item color__item--C_2101">C_2101</div>
    <div class="color__item color__item--C_636">C_636</div>
    <div class="color__item color__item--C_2728">C_2728</div>
    <div class="color__item color__item--C_2736">C_2736</div>
    <div class="color__item color__item--C_2726">C_2726</div>
  </div>

  <br /><br /><br />
  <Text tag="span" :variant="$typographyVariant.T_NORMAL_30"> 
    Icons
  </Text>

  <br /><br /><br />
  80x80 (LARGE_MOB / LARGE)
  <br /><br />

  <div class="icons">
    <div class="icons__item">
      <IconSvg :name="$iconName.ARROW_UP" />
      <span class="icons__name">ARROW_UP</span>
    </div>
    <div class="icons__item">
      <IconSvg :name="$iconName.ARROW_DOWN" />
      <span class="icons__name">ARROW_DOWN</span>
    </div>
    <div class="icons__item">
      <IconSvg :name="$iconName.CROSS" />
      <span class="icons__name">CROSS</span>
    </div>
    <div class="icons__item">
      <IconSvg :name="$iconName.ARROW_TOP" />
      <span class="icons__name">ARROW_TOP</span>
    </div>
    <div class="icons__item">
      <IconSvg :name="$iconName.ARROW_LEFT" />
      <span class="icons__name">ARROW_LEFT</span>
    </div>
    <div class="icons__item">
      <IconSvg :name="$iconName.ARROW_RIGHT" />
      <span class="icons__name">ARROW_RIGHT</span>
    </div>
    <div class="icons__item">
      <IconSvg :name="$iconName.PLUS" />
      <span class="icons__name">PLUS</span>
    </div>
    <div class="icons__item">
      <IconSvg :name="$iconName.SEARCH_ICON" />
      <span class="icons__name">serch_icon</span>
    </div>
  </div>

  <br /><br /><br />
  40x40 (MEDIUM_MOB / MEDIUM)
  <br /><br />

  <div class="icons ">
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.ARROW_UP" 
        :size="$iconSize.MEDIUM_MOB"
      />
      <span class="icons__name">ARROW_UP</span>
    </div>
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.ARROW_DOWN" 
        :size="$iconSize.MEDIUM_MOB"
      />
      <span class="icons__name">ARROW_DOWN</span>
    </div>
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.CROSS" 
        :size="$iconSize.MEDIUM_MOB"
      />
      <span class="icons__name">CROSS</span>
    </div>
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.ARROW_TOP" 
        :size="$iconSize.MEDIUM_MOB"
      />
      <span class="icons__name">ARROW_TOP</span>
    </div>
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.ARROW_LEFT" 
        :size="$iconSize.MEDIUM_MOB"
      />
      <span class="icons__name">ARROW_LEFT</span>
    </div>
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.ARROW_RIGHT" 
        :size="$iconSize.MEDIUM_MOB"
      />
      <span class="icons__name">ARROW_RIGHT</span>
    </div>
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.PLUS" 
        :size="$iconSize.MEDIUM_MOB"
      />
      <span class="icons__name">PLUS</span>
    </div>
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.SEARCH_ICON" 
        :size="$iconSize.MEDIUM_MOB"
      />
      <span class="icons__name">SEARCH_ICON</span>
    </div>
  </div>
  
  <br /><br /><br />
  32x32 (NEW_MEDIUM_MOB / NEW_MEDIUM)
  <br /><br />

  <div class="icons ">
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.ARROW_UP" 
        :size="$iconSize.NEW_MEDIUM_MOB"
      />
      <span class="icons__name">ARROW_UP</span>
    </div>
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.ARROW_DOWN" 
        :size="$iconSize.NEW_MEDIUM_MOB"
      />
      <span class="icons__name">ARROW_DOWN</span>
    </div>
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.CROSS" 
        :size="$iconSize.NEW_MEDIUM_MOB"
      />
      <span class="icons__name">CROSS</span>
    </div>
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.ARROW_TOP" 
        :size="$iconSize.NEW_MEDIUM_MOB"
      />
      <span class="icons__name">ARROW_TOP</span>
    </div>
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.ARROW_LEFT" 
        :size="$iconSize.NEW_MEDIUM_MOB"
      />
      <span class="icons__name">ARROW_LEFT</span>
    </div>
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.ARROW_RIGHT" 
        :size="$iconSize.NEW_MEDIUM_MOB"
      />
      <span class="icons__name">ARROW_RIGHT</span>
    </div>
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.PLUS" 
        :size="$iconSize.NEW_MEDIUM_MOB"
      />
      <span class="icons__name">PLUS</span>
    </div>
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.SEARCH_ICON" 
        :size="$iconSize.NEW_MEDIUM_MOB"
      />
      <span class="icons__name">SEARCH_ICON</span>
    </div>
  </div>

  <br /><br /><br />
  80x40 (SPEC_MEDIUM_MOB / SPEC_MEDIUM)
  <br /><br />

  <div class="icons">
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.ARROW_GALLERY_LEFT" 
        :size="$iconSize.SPEC_MEDIUM_MOB"
      />
      <span class="icons__name">ARROW_GALLERY_LEFT</span>
    </div>
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.ARROW_GALLERY_RIGHT" 
        :size="$iconSize.SPEC_MEDIUM_MOB"
      />
      <span class="icons__name">ARROW_GALLERY_RIGHT</span>
    </div>
  </div>

  <br /><br /><br />
  40x20 (SPEC_SMALL_MOB / SPEC_SMALL)
  <br /><br />

  <div class="icons icons--path">
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.ARROW_GALLERY_LEFT" 
        :size="$iconSize.SPEC_SMALL_MOB"
      />
      <span class="icons__name">ARROW_GALLERY_LEFT</span>
    </div>
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.ARROW_GALLERY_RIGHT" 
        :size="$iconSize.SPEC_SMALL_MOB"
      />
      <span class="icons__name">ARROW_GALLERY_RIGHT</span>
    </div>
  </div>

  <br /><br /><br />
  20x20 (SMALL_MOB / SMALL)
  <br /><br />

  <div class="icons icons--path">
    <div class="icons__item">
      <IconSvg 
        :name="$iconName.SEARCH_ICON" 
        :size="$iconSize.SMALL_MOB"
      />
      <span class="icons__name">SEARCH_ICON</span>
    </div>
  </div>
  <br /><br /><br />
</div>
</template>

<style lang="scss" scoped>
.color {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.color__item {
  width: em(200);
  height: em(200);
  display: flex;
  align-items: center;
  justify-content: center;
  &--WHITE {
    background-color: var(--color-WHITE);
  }
  &--FON {
    background-color: var(--color-FON);
  }
  &--GRAY {
    background-color: var(--color-GRAY);
  }
  &--BLACK {
    background-color: var(--color-BLACK);
  }
  &--GRAY_LINE {
    background-color: var(--color-GRAY_LINE);
  }
  &--WHITE_LINE {
    background-color: var(--color-WHITE_LINE);
  }
  &--C_2758 {
    background-color: var(--color-C_2758);
  }
  &--C_285 {
    background-color: var(--color-C_285);
  }
  &--C_2925 {
    background-color: var(--color-C_2925);
  }
  &--C_2101 {
    background-color: var(--color-C_2101);
  }
  &--C_636 {
    background-color: var(--color-C_636);
  }
  &--C_2728 {
    background-color: var(--color-C_2728);
  }
  &--C_2736 {
    background-color: var(--color-C_2736);
  }
  &--C_2726 {
    background-color: var(--color-C_2726);
  }
}
.icons {
  display: flex;
  gap: em(15);
  flex-wrap: wrap;
  &--path {
    gap: em(45);
  }
}
.icons__item {
  position: relative;
}
.icons__name {
  position: absolute;
  left: 50%;
  top: calc(100% + em(10));
  transform: translate(-50%);
  font-size: em(6);
}
</style>