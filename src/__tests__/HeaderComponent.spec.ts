import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HeaderComponent from '@/components/header/HeaderComponent.vue'
import InfoItem from '@/components/molecules/InfoItem.vue'
import StatusOrder from '@/components/header/StatusOrder.vue'
import type { IOrderHeader } from '@/types/order'


vi.mock('@/composables/useIcons', () => ({
  useIcons: vi.fn((iconName: string) => `/icons/${iconName}.svg`),
}))

describe('HeaderComponent', () => {
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
    const wrapper = mount(HeaderComponent, {
      props: {
        header: mockHeader,
      },
      global: {
        components: {
          InfoItem,
          StatusOrder,
        },
      },
    })


    expect(wrapper.exists()).toBe(true)


    expect(wrapper.find('.header').exists()).toBe(true)
    expect(wrapper.find('.badger').exists()).toBe(true)
    expect(wrapper.find('.container').exists()).toBe(true)
  })

  it('exibe as informações do pedido corretamente', () => {
    const wrapper = mount(HeaderComponent, {
      props: {
        header: mockHeader,
      },
      global: {
        components: {
          InfoItem,
          StatusOrder,
        },
      },
    })


    expect(wrapper.find('.badger__title').text()).toBe('Pre-Order')


    expect(wrapper.find('.badger__number').text()).toBe('12345')


    expect(wrapper.find('.badger__serial').text()).toBe('#67890')


    expect(wrapper.find('.order-data__buyer').text()).toBe('João Silva')
  })

  it('renderiza os componentes InfoItem com as props corretas', () => {
    const wrapper = mount(HeaderComponent, {
      props: {
        header: mockHeader,
      },
      global: {
        components: {
          InfoItem,
          StatusOrder,
        },
      },
    })

    const infoItems = wrapper.findAllComponents(InfoItem)


    expect(infoItems).toHaveLength(4)


    expect(infoItems[0].props('text')).toBe(mockHeader.contact.name)
    expect(infoItems[1].props('text')).toBe(mockHeader.contact.email)
    expect(infoItems[2].props('text')).toBe(mockHeader.contact.phone)
    expect(infoItems[3].props('text')).toBe(mockHeader.contact.fax)
  })

  it('renderiza dois componentes StatusOrder', () => {
    const wrapper = mount(HeaderComponent, {
      props: {
        header: mockHeader,
      },
      global: {
        components: {
          InfoItem,
          StatusOrder,
        },
      },
    })

    const statusOrders = wrapper.findAllComponents(StatusOrder)

    expect(statusOrders).toHaveLength(2)


    statusOrders.forEach((statusOrder) => {
      expect(statusOrder.props('header')).toEqual(mockHeader)
    })
  })

  it('renderiza a estrutura de contato corretamente', () => {
    const wrapper = mount(HeaderComponent, {
      props: {
        header: mockHeader,
      },
      global: {
        components: {
          InfoItem,
          StatusOrder,
        },
      },
    })

    const contactDiv = wrapper.find('.contact')
    expect(contactDiv.exists()).toBe(true)

    const contactInfoItems = contactDiv.findAllComponents(InfoItem)
    expect(contactInfoItems).toHaveLength(3)
  })
})
