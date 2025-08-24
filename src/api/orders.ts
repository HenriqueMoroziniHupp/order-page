import { mercadoAPI } from '@/config/axios'

export default {
  getOrder(id: number) {
    return mercadoAPI({
      method: 'GET',
      url: `/orders/${id}`,
    })
  },
}
