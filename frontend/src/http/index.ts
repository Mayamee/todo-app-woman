import axios from 'axios'

const $api = axios.create({ withCredentials: true, baseURL: 'http://localhost:5050/api' })

export { $api }
