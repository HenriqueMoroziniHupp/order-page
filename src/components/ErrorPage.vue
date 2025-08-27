<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  buttonText?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Ops! Algo deu errado',
  subtitle: 'Não foi possível processar sua solicitação. Tente novamente mais tarde.',
  buttonText: 'Voltar para Home',
})

const emit = defineEmits<{
  buttonClick: []
}>()

const isLoading = ref(false)

const handleButtonClick = async () => {
  if (isLoading.value) return

  isLoading.value = true
  emit('buttonClick')
}
</script>

<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-icon">
        <div class="error-symbol">!</div>
      </div>
      <h2 class="error-title" v-text="title" />
      <p class="error-subtitle" v-text="subtitle" />
      <button
        class="retry-button"
        :class="{ loading: isLoading }"
        :disabled="isLoading"
        @click="handleButtonClick"
      >
        <span v-if="isLoading" class="spinner" />
        <span :class="{ 'button-text': isLoading }" v-text="buttonText" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, $red-100 0%, lighten($red-100, 5%) 100%);
  padding: 2rem;

  .error-content {
    text-align: center;
    max-width: 400px;
    width: 100%;

    .error-icon {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto 2rem;
      background: $red-300;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 32px rgba($red-300, 0.3);

      .error-symbol {
        font-size: 2.5rem;
        font-weight: bold;
        color: white;
        line-height: 1;
      }
    }

    .error-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: $red-300;
      margin: 0 0 0.5rem 0;
      letter-spacing: -0.02em;
    }

    .error-subtitle {
      font-size: 1rem;
      color: $gray-500;
      margin: 0 0 2rem 0;
      line-height: 1.5;
    }

    .retry-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      text-decoration: none;
      background: linear-gradient(135deg, $red-300, darken($red-300, 10%));
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 16px rgba($red-300, 0.3);
      min-width: 140px;
      position: relative;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba($red-300, 0.4);
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.8;
      }

      &.loading {
        .button-text {
          opacity: 0.7;
        }
      }

      .spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
