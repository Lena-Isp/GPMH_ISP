<script setup>
const props = defineProps({
  categoriesData: { type: Array, required: true, default: () => [] }
})
const { t } = useI18n()
const CHANNELS_TITLE = t("pinia.partners") //для названия "федеральные телеканалы"
const IS_TV = "televidenie"
</script>

<template>
  <CollapseItem  
    :headerName="itemCategory.name"
    :number="itemCategory.assetsCount"
    v-for="itemCategory in categoriesData"
    :key="itemCategory.id"
    class="collapse-ui container-indent-left"
  > 
    <!-- заголовок в только блоке телевидение -->
    <Text 
      v-if="itemCategory.slug === IS_TV"
      tag="h3"
      :variant="$typographyVariant.T_NORMAL_24"
      :font="$font.TTSMALLS_REGULAR"
      :color="$color.WHITE_LINE"
      class="collapse-header"
    >  {{ CHANNELS_TITLE }} </Text>

    <!-- активы во всех владках -->
    <div class="collapse-block">
      <Chips
        v-for="assetItem in itemCategory.channels || []"
        :key="assetItem.id"
        :name="assetItem.name"
        :link="`/business/partner/${assetItem.slug}`"
        :hoverColor="$color.C_285"
      />
    </div>

    <!-- вложенные активы (assetsDeep)-->
    <template v-for="assetsDeepItem in itemCategory.assetsDeep || []" :key="assetsDeepItem.id">
      <Text 
        tag="h3"
        :variant="$typographyVariant.T_NORMAL_24"
        :font="$font.TTSMALLS_REGULAR"
        :color="$color.WHITE_LINE"
        class="collapse-header"
      > {{ assetsDeepItem.name }} </Text>
      <div class="collapse-block">
        <Chips
          v-for="channelsItem in assetsDeepItem.channels || []"
          :key="channelsItem.id"
          :name="channelsItem.name"
          :link="`/business/partner/${channelsItem.slug}`"
          :hoverColor="$color.C_285"
        />
      </div>
    </template>
  </CollapseItem>
</template>

<style lang="scss" scoped>
  .collapse-header {
    margin-top: em(40);
  }
  .collapse-block {
    margin-top: em(40);
    display: flex;
    flex-wrap: wrap;
    gap: em(10);
    @include mq('desktop') {
      gap: em(15);
    }
  }
</style>