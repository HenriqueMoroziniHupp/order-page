import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/order/:orderId',
      name: 'Order',
      component: () => import('@/views/OrderView.vue'),
      props: (route) => ({
        orderId: Number(route.params.orderId),
      }),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/order/1',
    },
  ],
})

export default router
