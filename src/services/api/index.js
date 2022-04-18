import axios from 'axios'

export const $host = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})
