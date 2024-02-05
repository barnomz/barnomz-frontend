import ScheduleTabs from '@/components/schedule/ScheduleTabs'
import Head from 'next/head'
import ExamsTable from '@/components/exams/ExamsTable'
import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { setToken } from '@/services/axios'
import api from '@/services/api'
import { courseMapper } from '@/utils/mappers'

export default function ExamsPage({ schedules }) {
  const [courses, setCourses] = useState(schedules[0]?.courses || [])
  const [currentScheduleId, setCurrentScheduleId] = useState(schedules[0]?.id)

  useEffect(() => {
    setCourses(schedules.find((s) => s.id === currentScheduleId)?.courses)
  }, [currentScheduleId])

  return (
    <>
      <Head>
        <title>برنومز | برنامه امتحانات</title>
      </Head>
      <div className='aboslute flex h-full w-full justify-center p-6 text-white'>
        <div className='flex max-w-[98.875rem] grow flex-col justify-between gap-4 rounded-xl bg-primary/50 p-4 backdrop-blur'>
          <h1 className='text-2xl font-bold'>برنامه امتحانات</h1>
          <ScheduleTabs
            showAddButton={false}
            currentScheduleId={currentScheduleId}
            schedules={schedules.map((s) => ({
              id: s.id,
            }))}
            onChange={setCurrentScheduleId}
          />
          <ExamsTable courses={courses} />
        </div>
      </div>
      <div className='grow'></div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req })
  setToken(session.accessToken)
  const schedules = await api.schedule
    .fetchSchedules()
    .then((res) => res.data.data)
  schedules.forEach((schedule) => {
    schedule.courses = schedule.classes.map(courseMapper)
    delete schedule.classes
  })
  console.log(schedules)
  console.log(schedules[0].courses)
  return {
    props: {
      schedules,
    },
  }
}
