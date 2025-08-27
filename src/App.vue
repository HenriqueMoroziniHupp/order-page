<script setup lang="ts">
import LoadingPage from '@/components/LoadingPage.vue'
</script>

<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in" name="fade">
        <Suspense>
          <component :is="Component"></component>
          <template #fallback>
            <LoadingPage
              title="Carregando Aplicação"
              subtitle="Aguarde enquanto carregamos o conteúdo..."
            />
          </template>
        </Suspense>
      </Transition>
    </template>
  </RouterView>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
