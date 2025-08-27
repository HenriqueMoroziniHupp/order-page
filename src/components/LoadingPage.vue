<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Carregando',
  subtitle: 'Aguarde enquanto processamos sua solicitação...'
})
</script>

<template>
  <div class="loading-container">
    <div class="loading-content">
      <div class="loading-spinner">
        <div class="spinner-ring" v-for="spinner in 3" :key="spinner" />
      </div>
      <h2 class="loading-title" v-text="title" />
      <p class="loading-subtitle" v-text="subtitle" />
      <div class="loading-progress">
        <div class="progress-bar" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, $primary-50 0%, lighten($primary-50, 5%) 100%);
  padding: 2rem;

  .loading-content {
    text-align: center;
    max-width: 400px;
    width: 100%;

    .loading-spinner {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto 2rem;

      .spinner-ring {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 3px solid transparent;
        border-top: 3px solid $primary;
        border-radius: 50%;
        animation: spin 1.5s linear infinite;

        &:nth-child(1) {
          animation-delay: 0s;
        }

        &:nth-child(2) {
          animation-delay: -0.5s;
          transform: scale(0.8);
          border-top-color: lighten($primary, 20%);
        }

        &:nth-child(3) {
          animation-delay: -1s;
          transform: scale(0.6);
          border-top-color: lighten($primary, 40%);
        }
      }
    }

    .loading-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: $primary;
      margin: 0 0 0.5rem 0;
      letter-spacing: -0.02em;
    }

    .loading-subtitle {
      font-size: 1rem;
      color: $gray-500;
      margin: 0 0 2rem 0;
      line-height: 1.5;
    }

    .loading-progress {
      width: 100%;
      height: 4px;
      background: rgba($primary, 0.1);
      border-radius: 2px;
      overflow: hidden;
      position: relative;

      .progress-bar {
        height: 100%;
        background: linear-gradient(90deg, $primary, lighten($primary, 20%));
        border-radius: 2px;
        animation: progress 2s ease-in-out infinite;
      }
    }
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

@keyframes progress {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>