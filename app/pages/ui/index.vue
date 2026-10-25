<script setup>
const isPlusRotate = ref(false);

const count = ref(1);

const countAll = ref(15);

const isBullet = ref(false);

const networks = [
  { link: 'https://vk.com/kanal_tv3', title: 'ВКонтакте' },
  { link: 'https://ok.ru/tv3russia', title: 'Одноклассники' },
  { link: 'https://t.me/tv3russia', title: 'Telegram' },
  { link: 'https://rutube.ru/feeds/tv3/', title: 'RuTube' },
  { link: 'https://yappy.media/profile/a8bd530d3ed743ac94b7eba2117c91ba', title: 'Yappy' },
  { link: 'https://zen.yandex.ru/telekanaltv3', title: 'Дзен' }
];

const faq = [
  { id: 'q1', title: 'Вопрос1', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui consectetur modi quasi saepe unde, tempore deleniti id accusamus dolores suscipit earum voluptatibus iste tenetur ipsum voluptatem, vitae aliquid nemo impedit. ' },
  { id: 'q2', title: 'Вопрос2', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ' }
]

const actives = [
  { id: '1', title: 'Что такое Nuxt 4?', content: 'Это новая версия фреймворка...' },
  { id: '2', title: 'Как работает Composable?', content: 'Он выносит логику в чистый JS...' }
]

// const { data: images, pending, error } = await useFetch(
//   "https://www.gazprom-media.com/api/news?page=9&per_page=1"
// );

const rawItemsBussines = [
  { id: 1, text: "телевидение", logo: "fgg/kll.png" },
  { id: 2, text: "цифровые платформы", logo: "fgg/kll.png" },
];

const rawItemsBus = [
  { id: 1, text: "телевидение", logo: "fgg/kll.png" },
];

</script>
<template>
<div> 
  <br /><br />
  <Text
    tag="NuxtLinkLocale"
    to="/ui/fonts"
    :variant="$typographyVariant.T_SUPER_BIG_30_MOB"
    :font="$font.TTSMALLS_REGULAR"
  > FONTS</Text>
  <br /><br />

  <Text
    tag="NuxtLinkLocale"
    to="/ui/tokens"
    :variant="$typographyVariant.T_SUPER_BIG_30_MOB"
    :font="$font.TTSMALLS_REGULAR"
  > TOKENS </Text>
  <br /><br /><br />

  <Text
    tag="span"
    :variant="$typographyVariant.T_SUPER_BIG_30_MOB"
    :font="$font.TTSMALLS_REGULAR"
  > КОМПОНЕНТЫ </Text>
  <div class="line">
    <Text
      tag="NuxtLinkLocale"
      to="/ui/elements"
      :variant="$typographyVariant.T_NORMAL_24" 
      :font="$font.TTSMALLS_REGULAR"
    >ELEMENTS</Text>
  </div>
  <div class="line">
    <Text 
      tag="NuxtLinkLocale"
      to="/ui/widgets"
      :variant="$typographyVariant.T_BIG_24_MOB" 
      :font="$font.TTSMALLS_REGULAR"
    >WIDGETS</Text>
  </div>


</div>
</template>

<style lang="scss" scoped>
.line {
  display: flex;
  gap: em(30);
  margin: em(10) 0 0 em(15);
  &--first {
    margin-top: em(15);
  }
  &--chips {
    gap: em(14);
  }
  &--mob {
    display: block;
    @include mq('desktop') {
      display: flex;
    }
  }
}
.slider {
  width: auto;
  gap: em(10);
}
.news {
  flex-wrap: wrap;
  gap: em(30);
}
.collapse {
  display: block;
  margin: 0;
  @include mq('desktop') {
    gap: em(30);
    margin: em(40) 0 em(40) em(30);
  }
  
}
</style>