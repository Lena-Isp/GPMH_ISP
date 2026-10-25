<script setup>
  import { NAVIGATION } from '~/constants/navigation'
  const { locale } = useI18n();

  const siteStore = useSiteStore()
 
  // Функция разворачивает channels (только для about)
  const expandAboutChannels = (nav) => {
    return nav.flatMap((item) => {
      if (item.id === 3 && item.channels) {
        const { channels, ...rest } = item
        return [rest, ...channels]
      }
      return [item]
    })
  }

  //для каждой колонки перечисляем какие пункты должны быть
  const columnNames = [
    ['menu.business', 'menu.media', 'menu.about'],               
    ['menu.aboutCsr', 'menu.aboutPriorities', 'menu.aboutHistory'],
    ['menu.aboutCareer', 'menu.contacts', 'menu.ui']
  ]

  const flatNav = expandAboutChannels(NAVIGATION)
  const columns = columnNames.map(itemColumn =>
    itemColumn.map(name => flatNav.find(item => item.name === name)).filter(Boolean)
  )
</script>
<template>
  <footer class="footer container-full"
    itemscope
    itemtype="http://schema.org/WPFooter"
  >
    <div class="footer__wrap">
      <div class="footer__item footer__item--nav">
        <div class="footer__cell"
          v-for="(column, idx) in columns"
          :key="idx"
        >
          <Text
            v-for="item in column" 
            :key="item.id"
            tag="NuxtLinkLocale"
            :to="item.slug"
            class="footer__line"
            :variant="[$typographyVariant.T_NORMAL_20_MOB, $typographyVariant.T_SMALL_20]"
            :font="$font.TTSMALLS_REGULAR"
          >{{ $t(item.name) }}</Text>
        </div>
      </div>
      <div class="footer__item footer__item--contacts" v-if=" siteStore?.settingsData">
        <Text
          :variant="[$typographyVariant.T_NORMAL_20_MOB, $typographyVariant.T_SMALL_20]"
          :font="$font.TTSMALLS_REGULAR"
          class="footer__line footer__line--address"
        >{{ siteStore?.settingsData.address }}</Text>
        <Text
          tag="a"
          :variant="[$typographyVariant.T_NORMAL_20_MOB, $typographyVariant.T_SMALL_20]"
          :font="$font.TTSMALLS_REGULAR"
          href="mailto:info@gazprom-media.com"
          class="footer__line footer__line--mail"
        >{{ siteStore?.settingsData.email }}</Text>
        <Text
          tag="a"
          :variant="[$typographyVariant.T_NORMAL_20_MOB, $typographyVariant.T_SMALL_20]"
          :font="$font.TTSMALLS_REGULAR"
          href="tel:+7(812)6096959"
          class="footer__line footer__line--tel"
        >{{ siteStore?.settingsData.phone_one }}</Text>
        <SocialList
          v-if="siteStore?.socialNetworks"
          :socials="siteStore?.socialNetworks"
          :color="$color.WHITE"
          mode="link"
          footer
        />
      </div>
      <div class="footer__item footer__item--copyright">
        <meta itemprop="copyrightHolder" content="Газпром-медиа холдинг" />
        <Text
          tag="a"
          :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SUPER_SMALL_16]"
          :font="$font.TTSMALLS_REGULAR"
          :href="locale == 'ru'
            ? '/doc/Personal_data_processing_policy_GPMH_WEB_RU.pdf'
            : '/doc/Personal_data_processing_policy_GPMH_WEB_ENG.pdf'
          "
          target="_blank"
          class="footer__line footer__line--copyright-link"
        >Политика обработки персональных данных</Text>
        <Text
          :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SUPER_SMALL_16]"
          :font="$font.TTSMALLS_REGULAR"
          class="footer__line footer__line--copyright-text"
        >
        <span class="footer__сopyright-icon">©</span>
        АО «Газпром-Медиа Холдинг» Все права защищены
        </Text>
      </div>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
.footer {
  position: relative;
  z-index: 1;
  overflow: hidden;
  background-color: var(--color-FON);
  color: var(--color-WHITE);
  border-top: 1px solid var(--color-WHITE_LINE);
  padding: em(60) 0 em(30);
  @include mq('desktop') {
    padding: em(100) 0 em(30);
  }
}

.footer__wrap {
  display: flex;
  flex-wrap: wrap;
  padding: 0 em($offset-base-mob) 0 em($offset-base-mob);
  @include mq('desktop') {
    padding: 0 em($offset-base-desc) 0 em($offset-base-desc);
  }
}

.footer__item {
  &--nav {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: em(30);
    @include mq('desktop') {
      justify-content: flex-start;
      width: 77%;
      margin-bottom: 0;
    }
  }
  &--contacts {
    width: 100%;
    margin-bottom: em(40);
    max-width: em(300);
    @include mq('desktop') {
      width: 23%;
      margin-bottom: em(0);
    }
  }
  &--copyright {
    width: 100%;
    @include mq('desktop') {
      margin-top: em(145);
    }
  }
}

.footer__cell {
  width: calc(50% - em(15));
  @include mq('desktop') {
    width: auto;
    margin-right: 8.2%;
  }
} 

.footer__line {
  display: block;
  margin-bottom: em(10);
  &--copyright-link {
    display: inline-block;
    text-decoration: underline;
    @include mq('desktop') {
      text-decoration: none;
      border-bottom: 1px solid var(--color-WHITE);
    }
  }
  &--tel {
    margin-bottom: em(18);
  }
  &--copyright-text {
    display: flex;
    gap: em(10);
    max-width: em(250);
    @include mq('desktop') {
      max-width: em(250);
      text-decoration: none;
      margin-bottom: 0;
    }
  }
}


</style>