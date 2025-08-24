import axios from 'axios'

const mercadoAPI = axios.create({
  baseURL: 'https://api.mercadoe.space',
})

export { mercadoAPI }
