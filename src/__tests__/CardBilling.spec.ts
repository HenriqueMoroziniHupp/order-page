import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CardBilling from '@/components/CardBilling.vue'
import InfoItem from '@/components/molecules/InfoItem.vue'
import type { IInfoItem } from '@/types/order'

describe('CardBilling', () => {
  const mockInfoItens: IInfoItem[] = [
    {
      src: '/icons/email.svg',
      text: 'test@email.com',
    },
    {
      src: '/icons/phone.svg',
      text: '+55 11 99999-9999',
    },
    {
      src: '/icons/address.svg',
      text: 'Rua Teste, 123',
    },
  ]

  const defaultProps = {
    title: 'Supplier',
    name: 'Empresa Teste LTDA',
    code: 'SUP123',
    infoItens: mockInfoItens,
  }

  it('renderiza corretamente com as props fornecidas', () => {
    const wrapper = mount(CardBilling, {
      props: defaultProps,
      global: {
        components: {
          InfoItem,
        },
      },
    })


    expect(wrapper.exists()).toBe(true)


    expect(wrapper.find('.card').exists()).toBe(true)
    expect(wrapper.find('.card__top').exists()).toBe(true)
    expect(wrapper.find('.card__bottom').exists()).toBe(true)
  })

  it('exibe o título corretamente', () => {
    const wrapper = mount(CardBilling, {
      props: defaultProps,
      global: {
        components: {
          InfoItem,
        },
      },
    })

    const titleElement = wrapper.find('.title')
    expect(titleElement.exists()).toBe(true)
    expect(titleElement.text()).toBe('Supplier')
  })

  it('exibe o nome corretamente', () => {
    const wrapper = mount(CardBilling, {
      props: defaultProps,
      global: {
        components: {
          InfoItem,
        },
      },
    })

    const nameElement = wrapper.find('.name')
    expect(nameElement.exists()).toBe(true)
    expect(nameElement.text()).toBe('Empresa Teste LTDA')
  })

  it('exibe o código quando fornecido', () => {
    const wrapper = mount(CardBilling, {
      props: defaultProps,
      global: {
        components: {
          InfoItem,
        },
      },
    })

    const badgerElement = wrapper.find('.badger')
    expect(badgerElement.exists()).toBe(true)
    expect(badgerElement.text()).toBe('#SUP123')
  })

  it('não exibe o código quando é null', () => {
    const propsWithoutCode = {
      ...defaultProps,
      code: null,
    }

    const wrapper = mount(CardBilling, {
      props: propsWithoutCode,
      global: {
        components: {
          InfoItem,
        },
      },
    })

    const badgerElement = wrapper.find('.badger')
    expect(badgerElement.exists()).toBe(false)
  })

  it('renderiza os componentes InfoItem com as props corretas', () => {
    const wrapper = mount(CardBilling, {
      props: defaultProps,
      global: {
        components: {
          InfoItem,
        },
      },
    })

    const infoItems = wrapper.findAllComponents(InfoItem)


    expect(infoItems).toHaveLength(3)


    expect(infoItems[0].props('src')).toBe('/icons/email.svg')
    expect(infoItems[0].props('text')).toBe('test@email.com')

    expect(infoItems[1].props('src')).toBe('/icons/phone.svg')
    expect(infoItems[1].props('text')).toBe('+55 11 99999-9999')

    expect(infoItems[2].props('src')).toBe('/icons/address.svg')
    expect(infoItems[2].props('text')).toBe('Rua Teste, 123')
  })

  it('renderiza com lista vazia de infoItens', () => {
    const propsWithEmptyInfo = {
      ...defaultProps,
      infoItens: [],
    }

    const wrapper = mount(CardBilling, {
      props: propsWithEmptyInfo,
      global: {
        components: {
          InfoItem,
        },
      },
    })

    const infoItems = wrapper.findAllComponents(InfoItem)
    expect(infoItems).toHaveLength(0)


    expect(wrapper.find('.card__bottom').exists()).toBe(false)


    expect(wrapper.find('.card').exists()).toBe(true)
    expect(wrapper.find('.title').text()).toBe('Supplier')
    expect(wrapper.find('.name').text()).toBe('Empresa Teste LTDA')
  })

  it('renderiza com diferentes tipos de dados', () => {
    const customProps = {
      title: 'Customer',
      name: 'João Silva',
      code: 'CUST456',
      infoItens: [
        {
          src: '/icons/user.svg',
          text: 'João Silva',
        },
      ],
    }

    const wrapper = mount(CardBilling, {
      props: customProps,
      global: {
        components: {
          InfoItem,
        },
      },
    })

    expect(wrapper.find('.title').text()).toBe('Customer')
    expect(wrapper.find('.name').text()).toBe('João Silva')
    expect(wrapper.find('.badger').text()).toBe('#CUST456')

    const infoItems = wrapper.findAllComponents(InfoItem)
    expect(infoItems).toHaveLength(1)
    expect(infoItems[0].props('text')).toBe('João Silva')
  })

  it('não exibe o badger quando code é string vazia', () => {
    const propsWithEmptyCode = {
      ...defaultProps,
      code: '',
    }

    const wrapper = mount(CardBilling, {
      props: propsWithEmptyCode,
      global: {
        components: {
          InfoItem,
        },
      },
    })


    const badgerElement = wrapper.find('.badger')
    expect(badgerElement.exists()).toBe(false)
  })
})
