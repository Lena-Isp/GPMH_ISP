<script setup>
//Загрузка данных
const siteStore = useSiteStore()
const { strategyPageData } = storeToRefs(siteStore)
await useAsyncData('strategyDataInit', () => siteStore.fetchStrategy())
</script>

<template>
  <div class="strategy">
    <Text
      tag="h1"
      :variant="[$typographyVariant.T_H1_55_MOB, $typographyVariant.T_H1_150]"
      :font="$font.MAREGRAPHE_REGULAR"
      :color="$color.WHITE"
    >{{ strategyPageData?.name }}</Text>

    <div class="strategy__intro container-indent-left">
      <Text
        :variant="[$typographyVariant.T_SUPER_BIG_27_MOB, $typographyVariant.T_SUPER_BIG_50]"
        :font="$font.TTSMALLS_MEDIUM"
        :color="$color.WHITE"
      >{{ strategyPageData?.properties?.description }}</Text>
    </div>

    <div class="strategy__cont">
      <StrategyItem
        v-for="(block, index) in strategyPageData?.strategies"
        :key="index"
        :topNumb="index + 1"
        :text="block.description"
      />
    </div>

    <div class="strategy__next container-full">
      <PaginationPage 
        text="КСО"
        link="https://pro.gazprom-media.com/"
        target="_blank"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.strategy {
  margin-top: em(88);
  @include mq('desktop') {
    margin-top: em(60);
  }
  h1 {
    word-break: break-all;
    hyphens: auto;
    @include mq('desktop') {
      word-break: normal;
      hyphens: none;
    }
  }
}

.strategy__intro {
  margin-top: em(100);
  margin-bottom: em(60);
  @include mq('desktop') {
    margin-top: em(280);
    margin-bottom: em(200);
  }
}

.strategy__cont {
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(#939393, .5);
  @include mq('desktop') {
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: em(180);
  }
}
</style>