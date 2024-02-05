import axios from 'axios'
import { getSession } from 'next-auth/react'

const baseUrl = 'http://127.0.0.1:8000/api'

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(async (request) => {
  const session = await getSession()

  if (session) {
    request.headers.Authorization = `Token ${session.accessToken}`
  }

  return request
})

export const setToken = (token) => {
  axiosInstance.defaults.headers.common.Authorization = `Token ${token}`
}

export default axiosInstance
