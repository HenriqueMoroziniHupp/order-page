<script setup lang="ts">
import { onMounted, ref } from 'vue'
import API from '@/api/orders'
import HeaderOrder from '@/components/header/HeaderComponent.vue'
import type { IOrder } from '@/types/order'
import CardBilling from '@/components/CardBilling.vue'
import { useIcons } from '@/composables/useIcons'

const { orderId } = defineProps({
  orderId: {
    type: Number,
    required: true,
  },
})
const order = ref<IOrder>({} as IOrder)
const showAddress = ref(true)

const toggleAddress = () => {
  showAddress.value = !showAddress.value
}

onMounted(async () => {
  try {
    const response = await API.getOrder(orderId)

    order.value = response.data
  } catch (error) {
    console.error(error)
    //
  }
})
</script>

<template>
  <div class="order-view" v-if="order.header">
    <HeaderOrder :header="order.header" />

    <div class="content">
      <CardBilling
        :title="'Supplier'"
        :name="order.supplier.name"
        :code="order.supplier.code"
        :info-itens="[
          {
            src: useIcons('addressCard'),
            text: `${order.supplier.document.type}: ${order.supplier.document.value}`,
          },
          {
            src: useIcons('email'),
            text: order.supplier.contact.email,
          },
          {
            src: useIcons('locationCheck'),
            text: order.supplier.address,
          },
          {
            src: useIcons('phone'),
            text: order.supplier.contact.phone,
          },
          {
            src: useIcons('name'),
            text: order.supplier.contact.name,
          },
          {
            src: useIcons('fax'),
            text: order.supplier.contact.fax,
          },
          {
            src: useIcons('eye'),
            text: order.supplier.readAt,
          },
        ]"
      />

      <div class="accordion">
        <div class="accordion__button" @click="toggleAddress">
          <img
            :class="['icon', { 'icon--inverted': showAddress }]"
            :src="useIcons('arrow')"
            alt="Arrow"
          />
          <span v-text="'Address'" />
        </div>
        <transition name="shrink-up">
          <section class="address" v-if="showAddress">
            <CardBilling
              v-for="(address, key) in order.addresses"
              :key
              :title="address.label"
              :name="address.name"
              :code="address.code"
              :info-itens="[
                {
                  src: useIcons('locationCheck'),
                  text: address.address,
                },
                {
                  src: useIcons('name'),
                  text: address.contact.name,
                },
                {
                  src: useIcons('email'),
                  text: address.contact.email,
                },
                {
                  src: useIcons('phone'),
                  text: order.supplier.contact.phone,
                },
                {
                  src: useIcons('fax'),
                  text: order.supplier.contact.fax,
                },
              ]"
            />
          </section>
        </transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-view {
  max-width: 1500px;
  margin: 0 auto;

  .content {
    margin: 1.25rem;
  }

  .accordion {
    &__button {
      cursor: pointer;
      width: fit-content;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 2rem 0 1rem 0;
      font-weight: $font-semi-bold;
      font-size: $text-base;

      .icon {
        padding: 0.5rem;
        height: 1rem;
        width: 1rem;
        border-radius: 100%;
        background-color: $primary-50;
        transition: transform 0.3s ease;
      }

      .icon--inverted {
        transform: rotate(180deg);
      }
    }

    .address {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
}
</style>
