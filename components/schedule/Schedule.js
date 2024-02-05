import FullCalendar from '@fullcalendar/react'
import faLocale from '@fullcalendar/core/locales/fa'
import timeGridPlugin from '@fullcalendar/timegrid'
import { DayTimeColsView } from '@fullcalendar/timegrid/internal'
import Course from '@/components/schedule/Course'
import { convertPersianNumberToEnglish } from '@/utils/helpers'
import { weekDays } from '@/constants/const'
import DeleteCourseDialogConfirmation from '@/components/schedule/DeleteCourseDialogConfirmation'
import { useState } from 'react'
import api from '@/services/api'
import messages from '@/constants/messages'
import { useToast } from '@/components/dls/toast/ToastService'

export default function Schedule({ courses, currentScheduleId, setSchedules }) {
  const toast = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [courseIdToBeDeleted, setCourseIdToBeDeleted] = useState(null)

  const handleEventClick = (clickInfo) => {
    // setCourseCodeToBeDeleted(clickInfo.event.extendedProps.course_code)
    setCourseIdToBeDeleted(Number(clickInfo.event.id))
    setIsOpen(true)
  }

  const removeCourse = () => {
    removeCourseApiCall({ id: courseIdToBeDeleted })

    setSchedules((prev) =>
      prev.map((schedule) => {
        if (schedule.id === currentScheduleId) {
          return {
            ...schedule,
            courses: schedule.courses.filter(
              (course) => course.id !== courseIdToBeDeleted,
            ),
          }
        }
        return schedule
      }),
    )
    setIsOpen(false)
  }

  const removeCourseApiCall = async (ctx) => {
    return await api.schedule
      .deleteCourseFromSchedule({
        scheduleId: currentScheduleId,
        data: { id: ctx.id },
      })
      .catch((err) => {
        const message =
          err.response?.data?.message ||
          err.response?.data?.detail ||
          messages.ERROR_OCCURRED
        toast.open({ message, type: 'error' })
      })
  }

  return (
    <div className='h-[700px]'>
      <DeleteCourseDialogConfirmation
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={removeCourse}
      />
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView='timeGridWeek'
        headerToolbar={false}
        editable={false}
        selectable={false}
        selectMirror={false}
        expandRows
        dayMaxEvents
        eventOverlap={false}
        slotEventOverlap={true}
        weekends
        events={courses}
        eventClick={handleEventClick}
        slotMinTime={'07:00'}
        slotMaxTime={'20:00'}
        direction='rtl'
        initialDate={'2023-12-30'}
        locale={faLocale}
        firstDay={0}
        height={'700px'}
        views={{
          timeGrid: {
            component: DayTimeColsView,
            usesMinMaxTime: true,
            allDaySlot: false,
            slotDuration: '01:00:00',
            duration: { days: 6 },
            slotLabelContent: ({ date }) => (
              <div className='me-1 ms-2 text-sm font-medium'>
                {convertPersianNumberToEnglish(date.getHours().toString())}
              </div>
            ),
            dayHeaderContent: ({ date }) => (
              <div className='pb-2 text-sm font-medium'>
                {
                  weekDays[
                    ((date.getDay() % weekDays.length) + weekDays.length) %
                      weekDays.length
                  ]
                }
              </div>
            ),
            eventContent: (event) => (
              <Course
                course={{
                  id: event.event.id,
                  ...event.event.extendedProps,
                }}
              ></Course>
            ),
          },
        }}
      />
    </div>
  )
}
