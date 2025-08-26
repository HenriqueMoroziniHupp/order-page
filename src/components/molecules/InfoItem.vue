<script setup lang="ts">
const { src, text } = defineProps<{
  src: string
  text: string
}>()
</script>

<template>
  <div class="item">
    <img class="icon" :src :alt="text" />
    <p class="text" v-text="text" />
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

  .icon {
    height: 1rem;
    width: 1rem;
    object-fit: cover;
  }
}
</style>
