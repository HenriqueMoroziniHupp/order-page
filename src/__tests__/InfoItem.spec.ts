import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import InfoItem from '@/components/molecules/InfoItem.vue'


Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
  },
})

describe('InfoItem', () => {
  const defaultProps = {
    src: '/icons/test-icon.svg',
    text: 'Texto de teste',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza corretamente com as props fornecidas', () => {
    const wrapper = mount(InfoItem, {
      props: defaultProps,
    })


    const icon = wrapper.find('.icon')
    expect(icon.exists()).toBe(true)
    expect(icon.attributes('src')).toBe(defaultProps.src)
    expect(icon.attributes('alt')).toBe(defaultProps.text)


    const text = wrapper.find('.text')
    expect(text.exists()).toBe(true)
    expect(text.text()).toBe(defaultProps.text)
  })

  it('copia o texto para o clipboard quando clicado', async () => {
    const wrapper = mount(InfoItem, {
      props: defaultProps,
    })

    const textElement = wrapper.find('.text')
    await textElement.trigger('click')


    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(defaultProps.text)
  })

  it('exibe mensagem de "Copiado" após clicar no texto', async () => {
    const wrapper = mount(InfoItem, {
      props: defaultProps,
    })


    expect(wrapper.find('.copied-message').exists()).toBe(false)


    const textElement = wrapper.find('.text')
    await textElement.trigger('click')
    await wrapper.vm.$nextTick()


    const copiedMessage = wrapper.find('.copied-message')
    expect(copiedMessage.exists()).toBe(true)
    expect(copiedMessage.text()).toBe('Copiado')
  })

  it('esconde a mensagem de "Copiado" após o timeout', async () => {
    vi.useFakeTimers()

    const wrapper = mount(InfoItem, {
      props: defaultProps,
    })


    const textElement = wrapper.find('.text')
    await textElement.trigger('click')
    await wrapper.vm.$nextTick()


    expect(wrapper.find('.copied-message').exists()).toBe(true)


    vi.advanceTimersByTime(1200)
    await wrapper.vm.$nextTick()


    expect(wrapper.find('.copied-message').exists()).toBe(false)

    vi.useRealTimers()
  })

  it('funciona com diferentes tipos de texto', () => {
    const testCases = [
      'email@teste.com',
      '+55 11 99999-9999',
      'Nome do Usuário',
      'Endereço completo, 123',
    ]

    testCases.forEach((text) => {
      const wrapper = mount(InfoItem, {
        props: {
          src: '/icons/test.svg',
          text,
        },
      })

      expect(wrapper.find('.text').text()).toBe(text)
    })
  })
})
