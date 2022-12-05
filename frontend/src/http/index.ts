import axios from 'axios'

const API = axios.create({ withCredentials: true, baseURL: 'http://localhost:5050/api/v1' })

export { API }
