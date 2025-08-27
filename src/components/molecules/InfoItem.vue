<script setup lang="ts">
import { ref } from 'vue'
import type { IInfoItem } from '@/types/order'

const { src, text } = defineProps<IInfoItem>()

const showCopiedMessage = ref(false)

const copyText = () => {
  navigator.clipboard.writeText(text)
  showCopiedMessage.value = true
  setTimeout(() => {
    showCopiedMessage.value = false
  }, 1200)
}
</script>

<template>
  <div class="item">
    <img class="icon" :src :alt="text" />
    <p class="text" @click="copyText" v-text="text" />
    <Transition name="fade">
      <div class="copied-message" v-if="showCopiedMessage">Copiado</div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.25rem;
  font-size: $text-2xs;
  color: $gray-500;
  position: relative;

  .icon {
    height: 1rem;
    width: 1rem;
    object-fit: cover;
  }

  .text {
    cursor: pointer;
    transition: color 0.2s ease;
    margin: 0;

    &:hover {
      color: $primary;
    }
  }

  .copied-message {
    position: absolute;
    top: -1.75rem;
    left: 20%;
    background: $primary;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba($primary, 0.3);
    z-index: 10;

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 4px solid transparent;
      border-top-color: $primary;
    }
  }
}
</style>
