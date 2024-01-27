import dataFetcher from '@/services/dataFetcher'

const NAMESPACE = '/comment/'

const comment = {
  likeComment(config) {
    return dataFetcher.post(NAMESPACE + config.commentId + '/like/', config)
  },
  dislikeComment(config) {
    return dataFetcher.post(NAMESPACE + config.commentId + '/dislike/', config)
  },
}

export default comment
