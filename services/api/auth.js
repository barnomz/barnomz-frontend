import dataFetcher from '@/services/dataFetcher'

const NAMESPACE = '/auth'

const auth = {
  login(config) {
    return dataFetcher.post(NAMESPACE + '/login/', config)
  },
  register(config) {
    return dataFetcher.post(NAMESPACE + '/register/', config)
  },
  logout(config) {
    return dataFetcher.post(NAMESPACE + '/logout/', config)
  },
}

export default auth
