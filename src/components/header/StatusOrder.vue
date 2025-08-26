<script setup lang="ts">
import type { IOrderHeader } from '@/types/order'
import { useIcons } from '@/composables/useIcons'
import { useFormatData, useFormatUSD } from '@/composables/useFormatter'

const { header } = defineProps<{
  header: IOrderHeader
}>()
</script>

<template>
  <div class="order-status">
    <p class="price" v-text="useFormatUSD(header.price)" />
    <p class="status" v-text="header.status" />
    <div class="created-at">
      <p v-text="useFormatData(header.createdAt)" />
      <img class="icon" :src="useIcons('infoTip')" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-status {
  display: flex;
  flex-direction: column;
  text-align: right;
  gap: 0.5rem;

  .price {
    color: $gray-500;
    font-size: $text-xl;
    font-weight: $font-semi-bold;
  }

  .status {
    color: $green-500;
    font-size: $text-xl;
    font-weight: $font-semi-bold;
  }

  .created-at {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0.25rem;
    font-size: $text-2xs;
    color: $gray-700;
  }
}
</style>
