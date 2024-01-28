import dataFetcher from '@/services/dataFetcher'

const NAMESPACE = '/departments/'

const department = {
  fetchColleges(config) {
    return dataFetcher.get(NAMESPACE, config)
  },
  fecthCollegeCourses(config) {
    return dataFetcher.get(NAMESPACE + config.collegeId + '/course/', config)
  },
}

export default department
