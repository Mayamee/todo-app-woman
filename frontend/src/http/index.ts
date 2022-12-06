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
      // чтобы избежать зацикливания при повторной попытке авторизации добавили флаг обработки
      originalRequest._retry = true
      try {
        // если не авторизован, то пробуем получить новый accessToken
        const response = await axios.get<IAuthModel>(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        })
        // записываем новый accessToken в localStorage
        localStorage.setItem('token', response.data.accessToken)
        console.log('Original request: ', originalRequest)
        // повторяем запрос пользователя
        return API.request(originalRequest)
      } catch (error) {
        // если не удалось получить новый accessToken, то перенаправляем на страницу авторизации
        console.log('Not authorized')
      }
    }
    throw error
  }
)

export { API }
