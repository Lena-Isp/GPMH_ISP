<script setup>
const menu = useMenuStore()

const route = useRoute()

const theme = computed(() => route.meta.theme || 'dark')
</script>

<template>
  <div 
    :class="[
      'burger', `burger--${theme}`, 
      {'burger--open': menu.isOpen}
    ]" 
    @click="menu.toggle" 
  />
</template>

<style lang="scss" scoped>

.burger {
  position: relative;
  z-index: 1;
  width: em(20);
  height: em(16);
  position: relative;
  box-sizing: border-box;
  transition: all .3s;
  margin-right: em(10);
  cursor: pointer;
  //overflow: hidden;  
  &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 10%;
    display: block;
    height: 2px;
    background: var(--color-WHITE);;
    transition: all .5s;
  }
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10%;
    display: block;
    height: 2px;
    background: var(--color-WHITE);;
    transition: transform .5s, width 2s;
  }
  &--light {
    &:before {
      background: var(--color-BLACK);
    }
    &:after {
      background: var(--color-BLACK);;
    }
  }
  &--open {
    border: 0;
    
    &:before {
      transform: rotate(45deg);
      background: var(--color-WHITE);
      top: 100%;
      margin-top: -40%;
      margin-left: 0;
    }
    &:after {
      transform: rotate(-45deg);
      background: var(--color-WHITE);
      top: 100%;
      margin-top: -40%;
      margin-left: 0;
    }
  }
  @include mq('desktop') {
    display: none;
  }
}
</style>