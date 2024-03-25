import Head from 'next/head'
import api from '@/services/api'
import LecturerInfo from '@/components/lecturer/LecturerInfo'
import BBtn from '@/components/dls/BBtn'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'
import Review from '@/components/lecturer/Review'
import { useState } from 'react'
import AddCommentDialog from '@/components/lecturer/AddCommentDialog'
import { getSession } from 'next-auth/react'
import { setToken } from '@/services/axios'

export default function LecturerPage({ lecturer, reviewsAsProp }) {
  const [reviews, setReviews] = useState(reviewsAsProp)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Head>
        <title>برنومز | اساتید</title>
      </Head>
      <div className='flex h-full min-h-[55rem] w-full justify-center p-6 text-white'>
        <AddCommentDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          setReviews={setReviews}
        />
        <div className='flex max-w-[98.875rem] grow gap-4'>
          <div className='flex grow flex-col rounded-xl bg-primary/50 p-4 backdrop-blur'>
            <h1 className='text-2xl font-bold'>دیدگاه‌ها</h1>
            <div className='my-6 flex items-center justify-between'>
              <span className='text-grey-200'>
                در مورد این استاد دیدگاهی دارید؟ اینجا به اشتراک بگذارید
              </span>
              <BBtn
                className='h-[3.25rem] px-16 font-medium'
                preIcon={faSquarePlus}
                onClick={() => setIsOpen(true)}
              >
                افزودن دیدگاه
              </BBtn>
            </div>

            <div className='flex flex-col divide-y divide-primary-light'>
              {reviews.length === 0 && (
                <div className='mx-auto'>هنوز دیدگاهی وجود ندارد...</div>
              )}
              {reviews.map((review) => (
                <Review
                  key={review.id}
                  review={review}
                  setReviews={setReviews}
                />
              ))}
            </div>
          </div>

          <LecturerInfo lecturer={lecturer} />
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req })
  setToken(session.accessToken)
  // fetch lecturers from /lecturers/<lecturersId>
  const fetchLecturerPromise = api.lecturer
    .fetchLecturer({ lecturerId: context.params.lecturers })
    .then((res) => res.data.data)
  const fetchLecturerReviewsPromise = api.lecturer
    .fetchLecturerReviews({ lecturerId: context.params.lecturers })
    .then((res) => res.data.data)
  // const fetchLecturerReviewsPromise = await Promise.resolve()

  const [lecturer, reviews] = await Promise.all([
    fetchLecturerPromise,
    fetchLecturerReviewsPromise,
  ])

  lecturer.name = lecturer.full_name
  lecturer.college = lecturer.department
  lecturer.numberOfVotes = lecturer.number_of_votes

  // const lecturer = {
  //   id: 1,
  //   name: 'محمد نظری',
  //   college: 'مهندسی کامپیوتر',
  //   numberOfVotes: 100,
  //   rate: {
  //     teachQuality: 1,
  //     scoring: 3,
  //     morality: 4.7,
  //   },
  // }
  // const reviewsAsProp = [
  //   {
  //     id: 1,
  //     date: '2023-01-01',
  //     text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
  //     likes: 20,
  //     dislikes: 5,
  //   },
  //   {
  //     id: 2,
  //     date: '2023-01-01',
  //     text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
  //     likes: 4,
  //     dislikes: 50,
  //   },
  //   {
  //     id: 2,
  //     date: '2023-01-01',
  //     text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
  //     likes: 48,
  //     dislikes: 1,
  //   },
  // ]
  return {
    props: { lecturer, reviewsAsProp: reviews },
  }
}
