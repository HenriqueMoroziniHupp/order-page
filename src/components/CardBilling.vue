<script setup lang="ts">
import type { IInfoItem } from '@/types/order'
import InfoItem from './molecules/InfoItem.vue'

const { title, name, code, infoItens } = defineProps<{
  title: string
  name: string
  code: string | null
  infoItens: IInfoItem[]
}>()
</script>

<template>
  <div class="card shadow-md">
    <div class="card__top">
      <p class="title" v-text="title" />
      <div class="card__top__wrapper">
        <p class="name" v-text="name" />
        <div v-if="code" class="badger">
          <p v-text="`#${code}`" />
        </div>
      </div>
    </div>
    <div class="card__bottom">
      <InfoItem v-for="(item, key) in infoItens" :key :src="item.src" :text="item.text" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  user-select: none;
  padding: 1.25rem;
  border-radius: 0.5rem;
  color: $gray-500;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  flex-grow: 1;

  &__top {
    .title {
      font-size: $text-2xs;
    }

    &__wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0.25rem 0 0.5rem;

      .name {
        font-size: $text-sm;
        color: $gray-700;
        font-weight: $font-semi-bold;
      }

      .badger {
        color: $primary;
        background-color: $primary-50;
        font-size: $text-2xs;
        font-weight: $font-medium;
        border-radius: 0.5rem;
        padding: 0.25rem;
      }
    }
  }

  &__bottom {
    display: grid;
    gap: 0.125rem 1rem;
    grid-template-columns: 1fr;

    @include screen(phone-big-up) {
      grid-template-columns: repeat(2, minmax(150px, 0.5fr));
    }
  }
}
</style>
