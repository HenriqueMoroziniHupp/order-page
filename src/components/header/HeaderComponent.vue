<script setup lang="ts">
import type { IOrderHeader } from '@/types/order'
import InfoItem from '@/components/molecules/InfoItem.vue'
import { useIcons } from '@/composables/useIcons'
import StatusOrder from './StatusOrder.vue'

const { header } = defineProps<{
  header: IOrderHeader
}>()
</script>

<template>
  <div class="header" v-if="header">
    <div class="badger">
      <div class="badger__wrapper">
        <p class="badger__title">Pre-Order</p>
        <h4 class="badger__number" v-text="header.number" />
        <small class="badger__serial" v-text="`#${header.serial}`" />
      </div>
      <StatusOrder class="order-status" :header />
    </div>
    <div class="container">
      <div class="order-data">
        <h5 class="order-data__buyer" v-text="header.buyer" />
        <InfoItem :src="useIcons('user')" :text="header.contact.name" />
        <div class="contact">
          <InfoItem :src="useIcons('envelope')" :text="header.contact.email" />
          <InfoItem :src="useIcons('phone')" :text="header.contact.phone" />
          <InfoItem :src="useIcons('fax')" :text="header.contact.fax" />
        </div>
      </div>
      <StatusOrder class="order-status" :header />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @include screen(tablet-up) {
    flex-direction: row;
    gap: 1.5rem;
  }

  .badger {
    display: flex;
    background-color: $primary;
    color: $white;
    border-radius: 0;
    width: 100%;
    transition: all 0.3s ease;

    @include screen(tablet-up) {
      gap: 2rem;
      width: 25%;
      border-radius: 0 1rem 1rem 0;
    }

    &__wrapper {
      padding: 1.25rem;
    }

    &__title {
      font-size: $text-lg;
      margin: 0;
    }

    &__number {
      font-size: $text-3xl;
      margin: 0.25rem 0;
    }

    &__serial {
      font-size: $text-2xs;
    }

    .order-status {
      margin-left: auto;
      padding: 1.25rem 1.25rem 1.25rem 0;

      * {
        color: $white !important;
      }

      @include screen(tablet-up) {
        display: none;
      }
    }
  }

  .container {
    width: 100%;
    margin: 0 1.25rem;
    display: flex;
    justify-content: space-between;
    background-color: $white;

    @include screen(tablet-up) {
      margin: 0.25rem 1.25rem 1.25rem 0;
    }

    .order-data {
      &__buyer {
        font-size: $text-xl;
        margin-top: 0;
        margin-bottom: 1rem;
      }
    }

    .contact {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      margin-top: 0.25rem;
      gap: 0.25rem 1rem;
    }

    .order-status {
      @include screen(tablet-down) {
        display: none !important;
      }
    }
  }
}
</style>
