<script setup>
import { globalStyles } from "@/components/tokens/_globalStyles";
const { locale } = useI18n();

const props = defineProps({
  error: Object,
});

useHead({
  style: [
    {
      innerHTML: `${globalStyles}`,
      type: "text/css",
    },
  ],
});

const handleClearError = () => {
  // Очищаем ошибку и перенаправляем на главную
  clearError({
    redirect: `/${locale.value}`,
  });
};

</script>
<template>
  <NuxtLayout name="default">
    <h1> {{ $t('error.title') }} </h1>
    <p> {{ $t('error.statusError') }}: {{ error.statusCode }} </p>
    <button @click="handleClearError">
      {{ $t('error.textButton') }} 
    </button>
  </NuxtLayout>
</template>