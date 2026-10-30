<script setup>
const newsStore = useNewsStore()
const newsFilterStore = useNewsFilterStore()

// Загружаем справочники фильтров
const { newsListFilter } = storeToRefs(newsStore)

await useAsyncData(
  'newsFilters',
  () => newsStore.fetchNewsFilters()
)

// Состояние модального окна
const { activeFilter } = storeToRefs(newsFilterStore)

const {
  closeModalFilter,
  checkedFilter,
  onApplyFilters,
} = newsFilterStore
</script>

<template>
  <Transition name="fade" appear>
    <div class="modal">
      <div class="modal__top">
        <IconSvg
          class="modal__close"
          :name="$iconName.CROSS"
          :size="[$iconSize.LARGE, $iconSize.NEW_MEDIUM_MOB]"
          @click="closeModalFilter"
        />

        <!-- PARTNER -->
        <div
          class="modal__filters"
          v-show="activeFilter === 'partner_id'"
        >
          <template
            v-for="item in newsListFilter?.partners"
            :key="item.id"
          >
            <Chips
              :name="item?.name"
              :id="item?.id"
              filterType="partner_id"
              :hoverColor="$color.C_2736"
              @click="checkedFilter('partner_id', item.id, item.name)"
            />
          </template>
        </div>
        <!-- PARTNER_END -->

        <!-- TAGS -->
        <div
          class="modal__filters"
          v-show="activeFilter === 'tag_id'"
        >
          <template
            v-for="item in newsListFilter?.tags"
            :key="item.id"
          >
            <Chips
              :name="item?.name"
              :id="item?.id"
              filterType="tag_id"
              :hoverColor="$color.C_2736"
              @click="checkedFilter('tag_id', item.id, item.name)"
            />
          </template>
        </div>
        <!-- TAGS_END -->

        <!-- DATE -->
        <div
          class="modal__filters modal__filters--date"
          v-show="activeFilter === 'date'"
        >
          <div class="modal__years">
            <Text
              :variant="[$typographyVariant.T_NORMAL_18_MOB, $typographyVariant.T_NORMAL_24]"
              :font="$font.TTSMALLS_REGULAR"
              :color="$color.GRAY"
            >
              Год
            </Text>
          </div>

          <template
            v-for="item in newsListFilter?.years"
            :key="item.id"
          >
            <Chips
              :name="item.name"
              :id="item.id"
              filterType="years"
              :hoverColor="$color.C_2736"
              @click="checkedFilter('years', item.id, item.name)"
            />
          </template>

          <div class="modal__month">
            <Text
              :variant="[$typographyVariant.T_NORMAL_18_MOB, $typographyVariant.T_NORMAL_24]"
              :font="$font.TTSMALLS_REGULAR"
              :color="$color.GRAY"
            >
              Месяц
            </Text>
          </div>

          <template
            v-for="item in newsListFilter?.months"
            :key="item.id"
          >
            <Chips
              :name="item.name"
              :id="item.id"
              filterType="months"
              :hoverColor="$color.C_2736"
              @click="checkedFilter('months', item.id, item.name)"
            />
          </template>
        </div>
        <!-- DATE_END -->
      </div>

      <div class="modal__footer">
        <ButtonMore
          text="Применить"
          @click="onApplyFilters"
        />
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

.modal__years,
.modal__month {
  width: 100%;
  margin-bottom: em(20);

  @include mq('desktop') {
    margin-bottom: em(30);
  }
}

.modal__month {
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