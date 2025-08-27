import axios from 'axios'

const mercadoAPI = axios.create({
  baseURL: '/api',
})

export { mercadoAPI }
