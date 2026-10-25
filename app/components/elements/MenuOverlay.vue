<script setup>

</script>

<template>
  <div class="overlay" /> 
</template>

<style lang="scss">
  .overlay {
    @include mq('desktop') {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(#0f0f0f, .7);
      z-index: 1;
    }
  }
</style>