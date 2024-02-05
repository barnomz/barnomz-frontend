import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import BBtn from '@/components/dls/BBtn'
import BInput from '@/components/dls/BInput'
import api from '@/services/api'
import { useToast } from '@/components/dls/toast/ToastService'
import messages from '@/constants/messages'
import { useParams } from 'next/navigation'

export default function AddCommentDialog({ isOpen, onClose, setReviews }) {
  const toast = useToast()
  const { lecturers } = useParams()
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const closeDialog = () => {
    setText('')
    setIsLoading(false)
    onClose()
  }

  const fetchReviews = async () => {
    const reviews = await api.lecturer
      .fetchLecturerReviews({ lecturerId: lecturers })
      .then((res) => res.data.data)
    setReviews(reviews)
  }

  const submitReview = async () => {
    setIsLoading(true)
    await api.comment
      .addComment({ data: { professor: lecturers, text } })
      .then(async (res) => {
        await fetchReviews()
        toast.open({
          message: 'دیدگاه شما با موفقیت ثبت شد.',
          type: 'success',
        })
        closeDialog()
      })
      .catch((err) => {
        const message =
          err.response?.data?.message ||
          err.response?.data?.detail ||
          messages.ERROR_OCCURRED
        toast.open({ message, type: 'error' })
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeDialog}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/50 backdrop-blur' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-xl border-2 border-solid border-secondary bg-primary-dark p-6 text-white shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='mb-2 w-full text-start text-lg font-medium'
                >
                  افزودن دیدگاه
                </Dialog.Title>
                <div className='mt-2 w-full'>
                  <BInput
                    value={text}
                    dir='rtl'
                    isTextarea
                    wrapperClass='!h-[200px] my-4 py-2'
                    inputClass='!h-[184px] !bg-primary'
                    placeholder={'دیدگاه خود را وارد کنید.'}
                    onChange={(e) => setText(e.target.value)}
                  ></BInput>
                </div>

                <BBtn
                  className='mb-3 w-full'
                  onClick={submitReview}
                  loading={isLoading}
                >
                  ثبت دیدگاه
                </BBtn>
                <BBtn color='ghost' className='w-full' onClick={closeDialog}>
                  انصراف
                </BBtn>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
