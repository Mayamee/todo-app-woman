import axios from 'axios'
import { IAuthModel } from '../models/IAuthModel'

const API_URL = 'http://localhost:5050/api/v1'
const API = axios.create({ withCredentials: true, baseURL: API_URL })

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers = {
    ...config.headers,
    Authorization: token ? `Bearer ${token}` : '',
  }
  return config
})

API.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const response = await axios.get<IAuthModel>(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        })
        localStorage.setItem('token', response.data.accessToken)
        console.log('Original request: ', originalRequest)
        return API.request(originalRequest)
      } catch (error) {
        console.log('Not authorized')
      }
    }
    throw error
  }
)

export { API }
