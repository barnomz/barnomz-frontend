import dataFetcher from '@/services/dataFetcher'

const NAMESPACE = '/lecturers/'

const lecturer = {
  fetchAllLecturers(config) {
    return dataFetcher.get(NAMESPACE, config)
  },
  fetchLecturer(config) {
    return dataFetcher.get(NAMESPACE + config.lecturerId + '/', config)
  },
  fetchLecturerReviews(config) {
    return dataFetcher.get(NAMESPACE + config.lecturerId + '/reviews/', config)
  },
}

export default lecturer
