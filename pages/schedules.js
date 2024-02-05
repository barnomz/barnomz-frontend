import Schedule from '@/components/schedule/Schedule'
import ScheduleTabs from '@/components/schedule/ScheduleTabs'
import Head from 'next/head'
import CourseSelector from '@/components/schedule/CourseSelector'
import api from '@/services/api'
import { useEffect, useState } from 'react'
import { setToken } from '@/services/axios'
import { getSession } from 'next-auth/react'
import { courseMapper } from '@/utils/mappers'

export default function SchedulesPage({ schedulesAsProp, colleges }) {
  const [schedules, setSchedules] = useState(schedulesAsProp)
  const [currentScheduleId, setCurrentScheduleId] = useState(schedules[0]?.id)
  const [courses, setCourses] = useState(schedules[0]?.courses || [])

  useEffect(() => {
    setCourses(schedules.find((s) => s.id === currentScheduleId)?.courses || [])
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

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req })
  setToken(session.accessToken)
  console.log(session.accessToken)
  const schedulesPromise = api.schedule
    .fetchSchedules()
    .then((res) => res.data.data)
  const collegesPromise = api.department
    .fetchColleges()
    .then((res) => res.data.data)

  const [schedules, colleges] = await Promise.all([
    schedulesPromise,
    collegesPromise,
  ])

  schedules.forEach((schedule) => {
    schedule.courses = schedule.classes.map(courseMapper) || []
    delete schedule.classes
  })

  return {
    props: {
      schedulesAsProp: schedules,
      colleges,
    },
  }
}
