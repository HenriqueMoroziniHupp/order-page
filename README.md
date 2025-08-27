# Me. - Sistema de Visualização de Pedidos

Um sistema web moderno para visualização de pedidos, desenvolvido com Vue 3, TypeScript e Vite.

## 📋 Sobre o Projeto

Este projeto é uma aplicação web que permite visualizar detalhes de pedidos. A aplicação possui:

- **Visualização de pedidos**: Exibe informações detalhadas de um pedido específico
- **Interface responsiva**: Design adaptável para diferentes dispositivos
- **Tratamento de erros**: Sistema de tratamento de erros com Suspense
- **Carregamento assíncrono**: Indicadores visuais durante o carregamento
- **Roteamento inteligente**: Redirecionamento para pedidos

## 🚀 Funcionalidades

### Principais

- ✅ Visualização de detalhes do pedido
- ✅ Informações de cobrança e endereço
- ✅ Toggle para mostrar/ocultar endereço
- ✅ Tratamento de estados de loading e erro
- ✅ Redirecionamento automático para `/order/1`

### Técnicas

- ✅ Suspense global para carregamento assíncrono
- ✅ Tratamento de erros com página de erro personalizada
- ✅ Spinner interativo nos botões
- ✅ Roteamento com Vue Router
- ✅ Integração com API do Mercado Livre

## 🛠️ Tecnologias Utilizadas

- **Vue 3** - Framework JavaScript progressivo
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool rápida e moderna
- **Vue Router** - Roteamento oficial do Vue
- **Axios** - Cliente HTTP para requisições
- **SCSS** - Pré-processador CSS
- **Vitest** - Framework de testes unitários
- **Cypress** - Testes end-to-end
- **Vue Gtag** - Integração com Google Analytics
- **Unhead** - Gerenciamento de head/meta tags

## 📁 Estrutura do Projeto

```
src/
├── api/           # Configurações e chamadas de API
├── assets/        # Estilos globais e variáveis SCSS
├── components/    # Componentes reutilizáveis
│   ├── header/    # Componentes do cabeçalho
│   └── molecules/ # Componentes moleculares
├── composables/   # Funções compostas do Vue
├── config/        # Configurações (Axios, etc.)
├── router/        # Configuração de rotas
├── types/         # Definições de tipos TypeScript
├── utils/         # Funções utilitárias
└── views/         # Páginas/Views da aplicação
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 20.19.0+ ou 22.12.0+
- npm ou yarn

### Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse `http://localhost:5173` no seu navegador

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run test:unit` - Executa testes unitários
- `npm run test:e2e` - Executa testes end-to-end
- `npm run lint` - Executa linting do código
- `npm run format` - Formata o código com Prettier

## 🔧 Configuração

### Variáveis de Ambiente

O projeto **não utiliza arquivo .env** propositalmente para facilitar a configuração. Todas as configurações necessárias estão definidas diretamente no código, permitindo que qualquer pessoa clone o repositório e execute imediatamente sem necessidade de configurar variáveis de ambiente.

As configurações do Axios para conectar com a API do Mercado Livre estão no arquivo `src/config/axios/`. Esta abordagem garante:

- ✅ **Setup instantâneo**: Clone e execute sem configurações adicionais
- ✅ **Facilidade para testes**: Não há dependências de configuração externa
- ✅ **Consistência**: Todos os desenvolvedores usam as mesmas configurações
- ✅ **Simplicidade**: Menos pontos de falha na configuração inicial

### Roteamento

Todas as rotas não encontradas são automaticamente redirecionadas para `/order/1`.

### Analytics e Head Management

#### Google Analytics

O projeto utiliza **vue-gtag** para integração com Google Analytics:

#### Gerenciamento de Head

O projeto utiliza **@unhead/vue** para gerenciamento de meta tags e título:

## 🎨 Componentes Principais

- **OrderView**: Página principal de visualização do pedido
- **HeaderComponent**: Cabeçalho da aplicação
- **CardBilling**: Card com informações de cobrança
- **LoadingPage**: Página de carregamento
- **ErrorPage**: Página de erro com botão de retry

## 🧪 Testes

O projeto inclui:

- **Testes unitários** com Vitest
- **Testes end-to-end** com Cypress
- **Linting** com ESLint
- **Formatação** com Prettier

## 📱 Responsividade

A aplicação é totalmente responsiva, utilizando:

- Breakpoints SCSS personalizados
- Design mobile-first

## 🔄 Estados da Aplicação

- **Loading**: Exibido durante carregamento de dados
- **Success**: Dados carregados com sucesso
- **Error**: Erro no carregamento com opção de retry

---

**Desenvolvido por [Henrique Morozini Hupp](https://me.upzini.com/) usando Vue 3 + TypeScript + Vite**
