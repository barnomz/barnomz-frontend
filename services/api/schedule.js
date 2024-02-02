import dataFetcher from '@/services/dataFetcher'

const NAMESPACE = '/schedules/'

const schedule = {
  fetchSchedules(config) {
    return dataFetcher.get(NAMESPACE, config)
  },
  addSchedule(config) {
    return dataFetcher.post(NAMESPACE, config)
  },
  deleteSchedule(config) {
    return dataFetcher.delete(NAMESPACE + config.scheduleId + '/', config)
  },
  addCourseToSchedule(config) {
    return dataFetcher.post(NAMESPACE + config.scheduleId + '/course/', config)
  },
  deleteCourseFromSchedule(config) {
    return dataFetcher.delete(
      NAMESPACE + config.scheduleId + '/course/',
      config,
    )
  },
}

export default schedule
