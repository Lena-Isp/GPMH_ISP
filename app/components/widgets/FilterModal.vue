<script setup>
const props = defineProps({
  modalTitle: Object,
})

const showModal = defineModel('show')
const activeFilter = defineModel('active')

const closeModal = () => {
  showModal.value = false
  activeFilter.value = null
}
</script>

<template>
  <Transition name="fade" appear v-show="showModal">
    <div class="modal">
      <div class="modal__top">
        <IconSvg
          class="modal__close"
          :name="$iconName.CROSS" 
          :size="[$iconSize.LARGE, $iconSize.NEW_MEDIUM_MOB]"
          @click="closeModal"
        />
        <div class="modal__filters" v-show="activeFilter == 'assets'">
          <template v-for="(x, index) in modalTitle?.partners" :key="index">
            <Chips 
              :name="x?.name"
              :hoverColor="$color.C_2736"
            />
          </template>
        </div>
        <div class="modal__filters" v-show="activeFilter == 'tags'">
          <template v-for="(x, index) in modalTitle?.tags" :key="index">
            <Chips 
              :name="x?.name"
              :hoverColor="$color.C_2736"
            />
          </template>
        </div>
        <div class="modal__filters modal__filters--date" v-show="activeFilter == 'date'">
          <div class="modal__years">
            <Text
              :variant="[$typographyVariant.T_NORMAL_18_MOB, $typographyVariant.T_NORMAL_24]"
              :font="$font.TTSMALLS_REGULAR"
              :color="$color.GRAY"
            >Год</Text>
          </div>
          <template v-for="(x, index) in modalTitle.years" :key="index">
            <Chips 
              :name="x.name"
              :hoverColor="$color.C_2736"
            />
          </template>
          <div class="modal__month">
            <Text
              :variant="[$typographyVariant.T_NORMAL_18_MOB, $typographyVariant.T_NORMAL_24]"
              :font="$font.TTSMALLS_REGULAR"
              :color="$color.GRAY"
            >Месяц</Text>
          </div>
          <template v-for="(x, index) in modalTitle.months" :key="index">
            <Chips 
              :name="x.name"
              :hoverColor="$color.C_2736"
            />
          </template>
        </div>
      </div>
      <div class="modal__footer">
        <ButtonMore text="Применить" />
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 3;
    background-color: var(--color-FON);
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: flex-start;
  }

  .modal__top {
    width: 100%;
    padding: em(10);
    height: calc(100vh - em(100));
    overflow-x: auto;
    text-align: right;
    @include mq('desktop') {
      padding: em(30);
    }
  }
  
  .modal__close {
    cursor: pointer;
  }

  .modal__filters {
    display: flex;
    flex-wrap: wrap;
    gap: em(10);
    margin-top: em(20);
    @include mq('desktop') {
      gap: em(20) em(14);
      margin-top: em(48);
    }
  }

  .modal__years, .modal__month{
    width: 100%;
    margin-bottom: em(20);
    @include mq('desktop') {
       margin-bottom: em(30);
    }
  }

  .modal__month{
    margin-top: em(30);
    @include mq('desktop') {
      margin-top: em(60);
    }
  }

  .modal__footer {
    width: 100%;
    height: em(100);
    background-color: var(--color-FON);
    display: flex;
    padding: em(10);
    @include mq('desktop') {
      padding: em(30);
    }
  }
</style>