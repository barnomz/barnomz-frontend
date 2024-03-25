import axios from 'axios'
import { getSessionFromCookie } from '@/helpers/getSessionFromCookie'

const baseUrl = process.env.CLIENT_API_BASE_URL + '/api'

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(async (request) => {
  const session = await getSessionFromCookie({ req: request })

  if (session) {
    request.headers.Authorization = `Token ${session.accessToken}`
  }

  return request
})

export const setToken = (token) => {
  axiosInstance.defaults.headers.common.Authorization = `Token ${token}`
}

export default axiosInstance
