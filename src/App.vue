<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import LoadingPage from '@/components/LoadingPage.vue'
import ErrorPage from '@/components/ErrorPage.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const hasError = ref(false)

onErrorCaptured((error, instance, info) => {
  console.error('Erro capturado:', error)
  console.error('Instância:', instance)
  console.error('Info:', info)

  hasError.value = true

  return false
})

const resetError = async () => {
  await router.push({ path: '/' })

  hasError.value = false
}
</script>

<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in" name="fade">
        <Suspense>
          <template #default>
            <component v-if="!hasError" :is="Component"></component>
            <ErrorPage v-else @button-click="resetError" />
          </template>
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
