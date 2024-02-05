import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareNodes, faUser } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import BBtn from '@/components/dls/BBtn'
import api from '@/services/api'
import messages from '@/constants/messages'
import { useToast } from '@/components/dls/toast/ToastService'
import { useState } from 'react'

export default function Review({ review, setReviews }) {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState({
    like: false,
    dislike: false,
  })

  const likeComment = async (commentId) => {
    setIsLoading((prev) => ({ ...prev, like: true }))
    await api.comment
      .likeComment({
        commentId,
        data: { professor: review.professor, text: review.text },
      })
      .then((res) => {
        setReviews((prev) =>
          prev.map((review) => {
            if (review.id !== commentId) return review
            return res.data.data
          }),
        )
      })
      .catch((err) => {
        const message =
          err.response?.data?.message ||
          err.response?.data?.detail ||
          messages.ERROR_OCCURRED
        toast.open({ message, type: 'error' })
      })
      .finally(() => setIsLoading((prev) => ({ ...prev, like: false })))
  }

  const dislikeComment = async (commentId) => {
    setIsLoading((prev) => ({ ...prev, dislike: true }))
    await api.comment
      .dislikeComment({
        commentId,
        data: { professor: review.professor, text: review.text },
      })
      .then((res) => {
        setReviews((prev) =>
          prev.map((review) => {
            if (review.id !== commentId) return review
            return res.data.data
          }),
        )
      })
      .catch((err) => {
        const message =
          err.response?.data?.message ||
          err.response?.data?.detail ||
          messages.ERROR_OCCURRED
        toast.open({ message, type: 'error' })
      })
      .finally(() => setIsLoading((prev) => ({ ...prev, dislike: false })))
  }

  return (
    <div className='gap flex w-full flex-col gap-2 py-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='custom-gradient flex items-center gap-4 rounded-md p-3'>
          <div className='rounded-md bg-primary-lighter p-1 pb-0'>
            <FontAwesomeIcon
              icon={faUser}
              size='2xl'
              className='text-grey-300 shadow-lg'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <span className='text-sm'>ناشناس</span>
            {/*<span className='text-xs text-grey-300'>{review.date}</span>*/}
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <BBtn
            postIcon={faThumbsUp}
            color='ghost'
            iconSize='lg'
            className='rounded-lg px-3 text-success'
            onClick={() => likeComment(review.id)}
            loading={isLoading.like}
          >
            {review.likes}
          </BBtn>
          <BBtn
            postIcon={faThumbsDown}
            color='ghost'
            iconSize='lg'
            className='rounded-lg px-3 text-error'
            onClick={() => dislikeComment(review.id)}
            loading={isLoading.dislike}
          >
            {review.dislikes}
          </BBtn>
          {/*<BBtn*/}
          {/*  icon={faShareNodes}*/}
          {/*  color='primary-light'*/}
          {/*  iconSize='lg'*/}
          {/*  className='rounded-lg px-3'*/}
          {/*/>*/}
        </div>
      </div>

      {/* Content */}
      <div>{review.text}</div>
    </div>
  )
}
