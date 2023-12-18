import dataFetcher from '@/services/dataFetcher'

const NAMESPACE = '/schedule'

const schedule = {
  fetchSchedules(config) {
    return dataFetcher.get(NAMESPACE + '/', config)
  },
  addSchedule(config) {
    return dataFetcher.post(NAMESPACE + '/', config)
  },
  deleteSchedule(config) {
    return dataFetcher.delete(NAMESPACE + '/', config)
  },
  addCourse(config) {
    return dataFetcher.post(NAMESPACE + '/course/', config)
  },
  deleteCourse(config) {
    return dataFetcher.delete(NAMESPACE + '/course/', config)
  },
}

export default schedule
