<script setup lang="ts">
import { ref } from 'vue'
import API from '@/api/orders'
import HeaderOrder from '@/components/header/HeaderComponent.vue'
import type { IOrder } from '@/types/order'
import CardBilling from '@/components/CardBilling.vue'
import ErrorPage from '@/components/ErrorPage.vue'
import { useIcons } from '@/composables/useIcons'

interface IErrorResponse {
  message: string
  detail: string
}

const { orderId } = defineProps({
  orderId: {
    type: Number,
    required: true,
  },
})

const order = ref<IOrder>({} as IOrder)
const showAddress = ref(true)
const loading = ref(true)
const responseError = ref({} as IErrorResponse)

const toggleAddress = () => {
  showAddress.value = !showAddress.value
}

const getOrder = async () => {
  try {
    loading.value = true
    const response = await API.getOrder(orderId)

    order.value = response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    responseError.value = error.response.data
  } finally {
    loading.value = false
  }
}

await getOrder()
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div class="order-view" v-if="!responseError.message && order.header">
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

    <ErrorPage v-else-if="responseError.message" />
  </Transition>
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
