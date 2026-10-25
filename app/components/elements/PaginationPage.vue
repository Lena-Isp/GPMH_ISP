<script setup>
  const router = useRouter()

  const props = defineProps({
    text: String,
    link: String,
  });

  const goLink = (link) => { 
    const isCheckHttps = /(http(s?)):\/\//i.test(link);
    if (isCheckHttps) { window.open(link,'_blank') } 
    else { router.push(link) }
  }
</script>

<template>
  <a
    class="page-pagination" 
    :href="link"
    @click.prevent="goLink(link)"
  >
    <Text
      :variant="[$typographyVariant.T_H1_55_MOB, $typographyVariant.T_H1_150]"
    > {{text}} </Text>
    <IconSvg
      class="page-pagination__arrow"
      :name="$iconName.ARROW_UP"
      :size="[$iconSize.NEW_MEDIUM_MOB, $iconSize.LARGE]"
      :color="$color.WHITE"
    />
  </a>
</template>

<style lang="scss" scoped>
.page-pagination {
  z-index: 1;
  width: 50%;
  margin-left: auto;
  height: em(500);
  background-color: v-bind("$color.C_2726");
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0 0 em(40) em(30);
  font-family: 'MaregrapheRegular', Arial, sans-serif;
  font-weight: 500;
  &:hover {
    cursor: pointer;
    .page-pagination__arrow {
      transform: translateX(0);
      opacity: 1;
      transition: transform .7s, opacity .6s;
      @media screen and (max-width: 1050px) {
        transform: translateX(0) rotate(45deg);
      }
    }
  }
  @media screen and (max-width: 1050px) {
    width: 100%;
    height: em(300);
    padding: 0 0 em(30) em(10);
  }
}
.page-pagination__arrow {
  position: absolute;
  right: em(30);
  bottom: em(60);
  transform: translateX(-40px);
  opacity: 0;
  z-index: 1;
  @media screen and (max-width: 1050px) {
    transform: translateX(0) rotate(45deg);
    opacity: 1;
    right: em(20);
    bottom: em(30);
  }
}
</style>