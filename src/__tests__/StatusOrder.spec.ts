import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusOrder from '@/components/header/StatusOrder.vue'
import type { IOrderHeader } from '@/types/order'


vi.mock('@/composables/useFormatter', () => ({
  useFormatUSD: vi.fn((value: number) => `$${value.toFixed(2)}`),
  useFormatData: vi.fn(() => '01/01/2024'),
}))

vi.mock('@/composables/useIcons', () => ({
  useIcons: vi.fn((iconName: string) => `/icons/${iconName}.svg`),
}))

describe('StatusOrder', () => {
  const mockHeader: IOrderHeader = {
    number: 12345,
    serial: 67890,
    buyer: 'João Silva',
    price: 299.99,
    currency: 'USD',
    createdAt: '2024-01-01T10:00:00Z',
    status: 'Confirmado',
    contact: {
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '+55 11 99999-9999',
      fax: '+55 11 88888-8888',
    },
  }

  it('renderiza corretamente com as props fornecidas', () => {
    const wrapper = mount(StatusOrder, {
      props: {
        header: mockHeader,
      },
    })


    expect(wrapper.exists()).toBe(true)


    expect(wrapper.find('.order-status').exists()).toBe(true)
  })

  it('exibe o preço formatado corretamente', () => {
    const wrapper = mount(StatusOrder, {
      props: {
        header: mockHeader,
      },
    })

    const priceElement = wrapper.find('.price')
    expect(priceElement.exists()).toBe(true)
    expect(priceElement.text()).toBe('$299.99')
  })

  it('exibe o status do pedido', () => {
    const wrapper = mount(StatusOrder, {
      props: {
        header: mockHeader,
      },
    })

    const statusElement = wrapper.find('.status')
    expect(statusElement.exists()).toBe(true)
    expect(statusElement.text()).toBe('Confirmado')
  })

  it('exibe a data de criação formatada', () => {
    const wrapper = mount(StatusOrder, {
      props: {
        header: mockHeader,
      },
    })

    const createdAtElement = wrapper.find('.created-at p')
    expect(createdAtElement.exists()).toBe(true)
    expect(createdAtElement.text()).toBe('01/01/2024')
  })

  it('exibe o ícone de informação', () => {
    const wrapper = mount(StatusOrder, {
      props: {
        header: mockHeader,
      },
    })

    const iconElement = wrapper.find('.created-at .icon')
    expect(iconElement.exists()).toBe(true)
    expect(iconElement.attributes('src')).toBe('/icons/infoTip.svg')
  })

  it('funciona com diferentes valores de preço', () => {
    const testCases = [
      { price: 0, expected: '$0.00' },
      { price: 10.5, expected: '$10.50' },
      { price: 1000, expected: '$1000.00' },
      { price: 99.99, expected: '$99.99' },
    ]

    testCases.forEach(({ price, expected }) => {
      const wrapper = mount(StatusOrder, {
        props: {
          header: {
            ...mockHeader,
            price,
          },
        },
      })

      expect(wrapper.find('.price').text()).toBe(expected)
    })
  })

  it('funciona com diferentes status', () => {
    const statusList = ['Pendente', 'Confirmado', 'Enviado', 'Entregue', 'Cancelado']

    statusList.forEach((status) => {
      const wrapper = mount(StatusOrder, {
        props: {
          header: {
            ...mockHeader,
            status,
          },
        },
      })

      expect(wrapper.find('.status').text()).toBe(status)
    })
  })
})
