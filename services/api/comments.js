import dataFetcher from '@/services/dataFetcher'

const NAMESPACE = '/comments/'

const comments = {
  likeComment(config) {
    return dataFetcher.post(NAMESPACE + config.commentId + '/like/', config)
  },
  dislikeComment(config) {
    return dataFetcher.post(NAMESPACE + config.commentId + '/dislike/', config)
  },
}

export default comments
