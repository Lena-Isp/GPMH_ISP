<script setup>
  const route = useRoute()
  const searchStore = useSearchStore()

  const { searchList, total, hasMore, loading } = storeToRefs(searchStore)
  const { fetchSearch, fetchLoadMore } = searchStore
  await useAsyncData(
    'fetchSearch', () => searchStore.fetchSearch(route.query),
    {
      watch: [() => route.fullPath],
    }
  )
</script>

<template>
  <div class="search-input">
    <SearchFormInput
      :placeholder="'Введите ваш запрос'"
    />
  </div>

  <div class="search-filter" v-show="searchList?.length">
    <div class="search-filter__result-tags">
      <button class="search-filter__result-item">
        <Text
          class="search-filter__result-item--active"
          :variant="[$typographyVariant.T_NORMAL_18_MOB, $typographyVariant.T_NORMAL_24]"
          :font="$font.TTSMALLS_REGULAR"
          :color="$color.WHITE"
        >Все результаты</Text>
        <Text
          :variant="[$typographyVariant.T_NORMAL_18_MOB, $typographyVariant.T_NORMAL_24]"
          :font="$font.TTSMALLS_REGULAR"
          :color="$color.GRAY"
        >{{ total }}</Text>
      </button>
    </div> 
    <div class="search-filter__result-sort">
      <button class="search-filter__result-item">
        <Text
          class="search-filter__result-item--active"
          :variant="[$typographyVariant.T_NORMAL_18_MOB, $typographyVariant.T_NORMAL_24]"
          :font="$font.TTSMALLS_REGULAR"
          :color="$color.WHITE"
        >Новые</Text>
      </button>
    </div>
  </div>

  <div class="search-result" v-show="searchList?.length">
    <SearchItem v-for="(item, idx) in searchList"
      :key="idx"
      :slug="item?.slug"
      :name="item?.name"
      :thumb="item?.image"
      :date="item?.date"
      :partnerName="item?.partner_name"
    />
  </div>
  <div
    class="search-button container-full"
    v-show="searchList?.length && hasMore"
  >
    <ButtonMore
      :text="loading ? 'Загрузка...' : 'Показать ещё'"
      @click="fetchLoadMore"
    />
  </div>
</template>

<style lang="scss" scoped>
  .search-input {
    position: relative;
    overflow: hidden;
    padding-top: em(92);
    @include mq('desktop') {
      padding-top: em(132);
    }
  }

  .search-filter {
    display: flex;
    justify-content: space-between;
    margin-top: em(60);
    margin-bottom: em(60);
    @include mq('desktop') {
      margin-top: em(133);
      margin-bottom: em(72);
    }
  }

  .search-filter__result-tags, .search-filter__result-sort{
    display: flex;
  }

  .search-filter__result-sort {
    margin-left: em(30);
    @include mq('desktop') {
      margin-left: 0
    }
  }

  .search-filter__result-item {
    color: var(--color-GRAY);
    display: block;
    font-family: 'TTSmallsRegular', Arial, sans-serif;
    padding: 0 em(15) 0 em(0);
    white-space: nowrap;
    @include mq('desktop') {
      padding: 0 em(30) 0 em(0);
    }
    &:last-child {
      padding: 0 em(0) 0 em(0);
      @include mq('desktop') {
        padding: 0 em(0) 0 em(0);
      }
    }
    span {
      padding: em(10) em(0);
      display: inline-block;
      @include mq('desktop') {
        padding: em(13.34) em(0);
      }
      &:nth-child(2) {
        padding-left: em(4.444);
        @include mq('desktop') {
          padding-left: em(6.675);
        }
      }
    }
    &--active {
      color: var(--color-WHITE);
      border-bottom: 1px solid var(--color-C_2101);
    }
  }

  .search-button {
    padding: em(80) 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 100%;
    @include mq('desktop') {
      padding: em(100) 0;
    }
  }
</style>