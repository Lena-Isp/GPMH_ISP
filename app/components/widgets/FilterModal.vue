<script setup>
const props = defineProps({
  modalTitle: Object,
  appliedFilters: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['apply'])

const showModal = defineModel('show')
const activeFilter = defineModel('active')

// Черновик выбранных значений: { assets: [id...], tags: [id...], years: [...], months: [...] }
const draft = ref({})

const isChipActive = (group, id) => (draft.value[group] || []).includes(id)

// Мультивыбор: повторный клик по chip снимает его
const toggleChip = (group, id) => {
  const current = draft.value[group] || []
  const next = current.includes(id)
    ? current.filter((x) => x !== id)
    : [...current, id]
  draft.value = { ...draft.value, [group]: next }
}

const selectedCount = computed(() =>
  Object.values(draft.value).reduce((sum, ids) => sum + (ids?.length || 0), 0)
)

const closeModal = () => {
  showModal.value = false
  activeFilter.value = null
}

const applyFilters = () => {
  emit('apply', { ...draft.value })
  closeModal()
}

// При открытии модалки подтягиваем уже применённые фильтры в черновик
watch(activeFilter, () => {
  draft.value = JSON.parse(JSON.stringify(props.appliedFilters ?? {}))
}, { immediate: true })
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
              :active="isChipActive('assets', x.id)"
              :hoverColor="$color.C_2736"
              @click="toggleChip('assets', x.id)"
            />
          </template>
        </div>
        <div class="modal__filters" v-show="activeFilter == 'tag_id'">
          <template v-for="(x, index) in modalTitle?.tags" :key="index">
            <Chips 
              :name="x?.name"
              :active="isChipActive('tag_id', x.id)"
              :hoverColor="$color.C_2736"
              @click="toggleChip('tag_id', x.id)"
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
              :active="isChipActive('years', x.id)"
              :hoverColor="$color.C_2736"
              @click="toggleChip('years', x.id)"
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
              :active="isChipActive('months', x.id)"
              :hoverColor="$color.C_2736"
              @click="toggleChip('months', x.id)"
            />
          </template>
        </div>
      </div>
      <div class="modal__footer">
        <ButtonMore :text="selectedCount > 0 ? `Применить (${selectedCount})` : 'Применить'" @click="applyFilters" />
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