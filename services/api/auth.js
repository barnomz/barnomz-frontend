import dataFetcher from '@/services/dataFetcher'

const NAMESPACE = '/auth'

const auth = {
  login(config) {
    return dataFetcher.post(NAMESPACE + '/login/', config)
  },
  verifyCaptcha(config) {
    return dataFetcher.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${config.siteKey}&response=${config.token}`,
    )
  },
  // ... other methods
}

export default auth
