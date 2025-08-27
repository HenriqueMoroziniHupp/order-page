describe('Componentes da Aplicação', () => {
  beforeEach(() => {
    cy.visit('/order/1')
    cy.get('.order-view').should('be.visible')
  })

  describe('StatusOrder Component', () => {
    it('deve formatar preço corretamente', () => {
      cy.get('.order-status .price').should('contain.text', '$')
    })

    it('deve exibir data formatada', () => {
      cy.get('.order-status .date').should('not.be.empty')
    })
  })

  describe('HeaderComponent', () => {
    it('deve exibir informações do cabeçalho do pedido', () => {
      cy.get('.header').should('be.visible')
      cy.get('.badger').should('be.visible')
      cy.get('.badger__title').should('contain.text', 'Pre-Order')
      cy.get('.badger__number').should('be.visible')
      cy.get('.badger__serial').should('be.visible')
    })

    it('deve exibir informações do comprador', () => {
      cy.get('.order-data__buyer').should('be.visible')
      cy.get('.order-data__buyer').should('not.be.empty')
    })

    it('deve exibir componentes StatusOrder', () => {
      cy.get('.header .order-status').should('have.length', 2)
    })

    it('deve ter estrutura de layout correta', () => {
      cy.get('.header .badger').should('be.visible')
      cy.get('.header .order-data').should('be.visible')
      cy.get('.header .contact').should('be.visible')
      cy.get('.header .status').should('be.visible')
    })
  })

  describe('CardBilling Component', () => {
    it('deve exibir card do fornecedor', () => {
      cy.get('.card').first().within(() => {
        cy.get('.title').should('contain.text', 'Supplier')
        cy.get('.name').should('be.visible')
        cy.get('.card__bottom').should('be.visible')
      })
    })

    it('deve exibir código do fornecedor quando disponível', () => {
      cy.get('.card').first().within(() => {
        cy.get('.badger').should('be.visible')
        cy.get('.badger').should('contain.text', '#')
      })
    })
  })

  describe('Integração entre Componentes', () => {
    it('deve carregar página completa sem erros', () => {
      cy.get('.order-view').should('be.visible')
      cy.get('.header').should('be.visible')
      cy.get('.content').should('be.visible')
      cy.get('.card').should('have.length.at.least', 1)
    })
  })
})