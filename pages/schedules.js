import Schedule from '@/components/schedule/Schedule'
import ScheduleTabs from '@/components/schedule/ScheduleTabs'
import Head from 'next/head'
import CourseSelector from '@/components/schedule/CourseSelector'
import api from '@/services/api'
import { useEffect, useState } from 'react'
import { schedules } from '@/constants/const'

export default function SchedulesPage({ schedulesAsProp, colleges }) {
  const [schedules, setSchedules] = useState(schedulesAsProp)
  const [currentScheduleId, setCurrentScheduleId] = useState(schedules[0].id)
  const [courses, setCourses] = useState(schedules[0].courses)

  useEffect(() => {
    setCourses(schedules.find((s) => s.id === currentScheduleId).courses)
  }, [currentScheduleId, schedules])

  return (
    <>
      <Head>
        <title>برنومز | برنامه هفتگی</title>
      </Head>
      <div className='flex h-full min-h-[55rem] w-full justify-center p-6 text-white'>
        <div className='flex max-w-[98.875rem] grow gap-4'>
          <div className='flex grow flex-col justify-between rounded-xl bg-primary/50 p-4 backdrop-blur'>
            <h1 className='text-2xl font-bold'>برنامه هفتگی کلاس‌ها</h1>
            <ScheduleTabs
              currentScheduleId={currentScheduleId}
              schedules={schedules.map((s) => ({
                id: s.id,
              }))}
              onChange={setCurrentScheduleId}
              setSchedules={setSchedules}
            />
            <Schedule
              courses={courses}
              currentScheduleId={currentScheduleId}
              setSchedules={setSchedules}
            />
          </div>

          <CourseSelector
            colleges={colleges}
            currentScheduleId={currentScheduleId}
            setCoursesOfSchedule={setCourses}
            setSchedules={setSchedules}
          />
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  // const schedulesPromise = api.schedule.fetchSchedules().then((res) => res.data)
  // const collegesPromise = api.department.fetchColleges().then((res) => res.data)

  // await Promise.allSettled([schedulesPromise, collegesPromise])
  const colleges = [
    { id: 1, name: 'مهندسی کامپیوتر' },
    { id: 2, name: 'مهندسی برق' },
    { id: 3, name: 'مهندسی عمران' },
    { id: 4, name: 'مهندسی مکانیک' },
    { id: 5, name: 'مهندسی شیمی' },
    { id: 6, name: 'مهندسی صنایع' },
    { id: 7, name: 'شیمی' },
    { id: 8, name: 'فیزیک' },
    { id: 9, name: 'ریاضی' },
    { id: 10, name: 'علو کامپیوتر' },
  ]
  return {
    props: {
      // schedules: schedulesPromise,
      // colleges: collegesPromise,
      schedulesAsProp: schedules,
      colleges,
    },
  }
}
