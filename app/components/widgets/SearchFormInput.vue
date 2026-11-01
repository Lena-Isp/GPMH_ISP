<script setup>
const route = useRoute()
const router = useRouter()

const props = defineProps({
  placeholder: {
    type: String,
  },
});

const { getFormatted } = useFormattedDate();

const search = ref(route.query.q || '');

const handleSearch = () => {
  const query = {...route.query}
  query.q = search.value
  router.push({query})
};
</script>

<template>
  <form class="search-page__form" @submit.prevent="handleSearch">
    <input
      class="search-page__input"
      type="text"
      :placeholder="placeholder"
      v-model="search"
    />
    <div class="search-page__close">
      <div class="search-page__close-wrap">
        <NuxtLinkLocale to="/">
          <IconSvg
            :name="$iconName.CROSS" 
            :size="[$iconSize.SMALL, $iconSize.SMALL_MOB]"
            :color="$color.WHITE"
          />
        </NuxtLinkLocale>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
  .search-page {
    position: relative;
    margin-top: em(92);
    font-family: 'TTSmallsRegular', Arial, sans-serif;
  }

  .search-page__wrap {
    position: relative;
    overflow: hidden;
    padding-top: em(92);
    @include mq('desktop') {
      padding-top: em(132);
    }
  }

  .search-page__form {
    padding-right: em(40);
    border-bottom: 1px solid var(--color-GRAY_LINE);
    position: relative;
  }

  .search-page__input {
    width: 100%;
    color: white;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 0;
    position: relative;
    box-shadow: none !important;
    font-family: 'TTSmallsMedium', Arial, sans-serif;
    font-size: em(30);
    line-height: em(40);
    @include mq('desktop') {
      font-size: em(60);
      line-height: 100%;
    }
  }

  .search-page__close {
    position: absolute;
    display: block;
    left: auto;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 0;
    svg {
      width: em(40);
      height: em(40);
      rect {
        width: 1px;
        fill: var(--color-C_2101)
      }
    }
  }

  .search-page__close-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>