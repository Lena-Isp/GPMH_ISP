<script setup>
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()

const props = defineProps({
  placeholder: {
    type: String,
  },
  typemodal: {
    type: Boolean,
    default: false
  },
});

const { getFormatted } = useFormattedDate()
const { isVisibleSearch, openModal, closeModal } = useSearchModal()

const search = ref(route.query.q || '')

const handleSearch = () => {
  const currentQuery = { ...route.query }
  currentQuery.q = search.value 

  if (!search.value) {
    delete currentQuery.q
  }

  router.push({
    path: localePath('search'),
    query: currentQuery
  })

  closeModal()
}

const closeSearch = () => {
  router.push({ path: localePath('index') })
}
</script>

<template>
  <form 
    class="search-form" 
    @submit.prevent="handleSearch"
  >
    <input
      class="search-form__input"
      type="text"
      :placeholder="placeholder"
      v-model="search"
      name="search-input"
    />
    <button 
      type="button"
      class="search-form__button"
      to="/"
      @click="typemodal ? handleSearch() : closeSearch()" 
    >
      <IconSvg
        v-if="typemodal"
        :name="$iconName.SEARCH"
        :size="[$iconSize.MEDIUM_MOB, $iconSize.UP_BUTTON]"
        :color="$color.WHITE"
      />
      <IconSvg
        v-else
        :name="$iconName.CROSS" 
        :size="[$iconSize.MEDIUM, $iconSize.MEDIUM_MOB]"
      />
    </button>
  </form>
</template>

<style lang="scss" scoped>
  .search-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(#fff, .5);
    position: relative;
    padding-bottom: em(10);
  }
  
  .search-form__input {
    width: 100%;
    color: var(--color-WHITE);
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 0;
    position: relative;
    box-shadow: none !important;
    font-size: em(30);
    line-height: 100%;
    font-family: var(--font-ttsmalls-regular);
    margin-right: em(4);
    @include mq('desktop') {
      font-size: em(60);
      line-height: 100%;
      margin-right: 0;
    }
    &::placeholder {
      color: rgba(#fff, 0.5);
      opacity: 1;
    }
    &:focus {
      color: var(--color-WHITE);
      outline: none;
    }
    // &:disabled {
    //   background-color: #e2e8f0;
    //   color: #718096;
    //   cursor: not-allowed;
    // }
  }

  .search-form__button {
    display: inline-block;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }
</style>