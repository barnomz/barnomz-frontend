import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareNodes, faUser } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import BBtn from '@/components/dls/BBtn'

export default function Review({ review }) {
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
            <span className='text-xs text-grey-300'>{review.date}</span>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <BBtn
            postIcon={faThumbsUp}
            color=''
            iconSize='lg'
            className='rounded-lg px-3 text-success'
          >
            {review.likes}
          </BBtn>
          <BBtn
            postIcon={faThumbsDown}
            color=''
            iconSize='lg'
            className='rounded-lg px-3 text-error'
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
