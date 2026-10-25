<script setup>
import { globalStyles } from "@/components/tokens/_globalStyles";
useHead({
  style: [
    {
      innerHTML: `${globalStyles}`,
      type: "text/css",
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
</style>
