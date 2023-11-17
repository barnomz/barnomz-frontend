import dataFetcher from '@/services/dataFetcher'

const NAMESPACE = '/auth'

const auth = {
  login(config) {
    return dataFetcher.post(NAMESPACE + '/login/', config)
  }
  // ... other methods
}

export default auth
