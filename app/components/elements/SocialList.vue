<script setup>
const props = defineProps({
  color: String,

  socials: {
    type: Array,
    default: [
      { title: 'Telegram' },
      { title: 'ВКонтакте' },
      { title: 'Одноклассники' },
    ]
  },

  mode: {
    type: String,
    default: 'link' // "share" или "link" или "footer"
  },

  footer: {
    type: Boolean,
    default: false
  }
})

const url = useRequestURL(); //для определения ссылки в адресной строке

const encodedUrl = encodeURIComponent(url.href)

const share = (event, url) => {
  if (props.mode === 'share') {
    event.preventDefault();
    window.open(url, '_blank', 'height=500,width=500,menubar=no,toolbar=no,location=no');
  }
};

const shareNetworksMap = {
  'Telegram': [
    'soctgm', 
    `https://t.me/share/url?url=${encodedUrl}`
  ],
  'ВКонтакте': [
    'socvk', 
    `https://vk.com/share.php?url=${encodedUrl}`
  ],
  'Одноклассники': [
    'socok', 
    `https://connect.ok.ru/dk?cmd=WidgetSharePreview&st.cmd=WidgetSharePreview&st._aid=ExternalShareWidget_SharePreview&st.shareUrl=${encodedUrl}`
  ],
  'RuTube': ['socrutube'],
  'Дзен': ['socdzen'],
  'Yappy': ['socyappy']
};

const networks = computed(() => {
  if  (!props.socials) return
  return props.socials.map(item => ({
    ...item,
    icon: shareNetworksMap[item?.title]?.[0],
    share: shareNetworksMap[item?.title]?.[1]
  }))
});
</script>

<template>
<div class="sosial-icon" :class="footer && 'sosial-icon--footer'" v-if="socials">
  <template v-for="(iconItem, index) in networks" :key="index">
    <a 
      v-if="iconItem?.icon"
      :href="mode === 'link' && iconItem?.link"
      rel="noopener noreferrer"
      target="_blank"
      @click="share($event, iconItem?.share)"
    >
      <Icon
        mode="svg"
        :name="`icons:${iconItem?.icon}`"
        :style="{'color': color}"
        class="sosial-icon__item"
        width="auto"
        :height="footer ? '2em' : '2.5em' "
      />
    </a>
  </template>
</div>
</template>

<style lang="scss" scoped>
.sosial-icon {
  display: flex;
  align-items: center;
  gap: em(16);
  &--footer {
    gap: em(10);
    @include mq('desktop') {
      gap: em(30);
    }
  }
}
</style>