import dataFetcher from '@/services/dataFetcher'

const NAMESPACE = '/lecturers/'

const schedule = {
  fetchLecturer(config) {
    return dataFetcher.get(NAMESPACE + config.lecturerId + '/', config)
  },
  fetchLecturerReviews(config) {
    return dataFetcher.get(NAMESPACE + config.lecturerId + '/reviews/', config)
  },
  addReview(config) {
    return dataFetcher.post(NAMESPACE + config.lecturerId + '/reviews/', config)
  },
  deleteReview(config) {
    return dataFetcher.delete(
      NAMESPACE + config.lecturerId + '/reviews/',
      config,
    )
  },
}

export default schedule
