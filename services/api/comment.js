import dataFetcher from '@/services/dataFetcher'

const NAMESPACE = '/comments/'

const comment = {
  addComment(config) {
    return dataFetcher.post(NAMESPACE + 'add/', config)
  },
  likeComment(config) {
    return dataFetcher.post(NAMESPACE + config.commentId + '/like/', config)
  },
  dislikeComment(config) {
    return dataFetcher.post(NAMESPACE + config.commentId + '/dislike/', config)
  },
}

export default comment
