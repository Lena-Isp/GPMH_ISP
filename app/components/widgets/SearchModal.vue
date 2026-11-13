<script setup>
const { isVisibleSearch, closeModal } = useSearchModal()

useHead({
  bodyAttrs: {
     class: computed(() => isVisibleSearch.value ? 'search-modal-open' : '')
  }
})
</script>

<template>
  <div class="search-modal-holder">
    <transition name="fade-overlay">
      <div v-if="isVisibleSearch" class="search-overlay" @click="closeModal"></div>
    </transition>

    <transition name="slide-modal">
      <div v-if="isVisibleSearch" class="search-modal">
        <div class="search-modal__wrap">
          <SearchFormInput 
            placeholder="Введите ваш запрос"
            :typemodal="true"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.search-modal-holder {
    position: relative;
    z-index: 9999;
  }

  // Заливка остального контента (Задний фон)
  .search-overlay {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(#000000, 0.6); // Черный цвет с прозрачностью 60%
    z-index: 2;
    transition: opacity 0.35s ease;
  }

  // Верхняя плашка со строкой поиска
  .search-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: em(400);
    z-index: 4;
    background-color: var(--color-C_2101); // Ваш фирменный цвет фона плашки
    display: flex;
    align-items: center;
    box-shadow: 0 10px 30px rgba(#000, 0.3); // Мягкая тень под плашкой для объема
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
    
    @include mq('desktop') {
      height: em(500);
    }
  }

  .search-modal__wrap {
    width: 100%;
    padding: em(10);
    @include mq('desktop') {
      padding: em(30);
    }
  }
 
  .fade-overlay-enter-active,
  .fade-overlay-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-overlay-enter-from,
  .fade-overlay-leave-to {
    opacity: 0;
  }

  .slide-modal-enter-active,
  .slide-modal-leave-active {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
  }
  .slide-modal-enter-from,
  .slide-modal-leave-to {
    transform: translateY(-100%);
    opacity: 0;
  }
</style>

<style lang="scss">
  body.search-modal-open {
    overflow-y: scroll;
    position: fixed; 
    width: 100%;
  }
</style>