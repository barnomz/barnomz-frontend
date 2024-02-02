import FullCalendar from '@fullcalendar/react'
import faLocale from '@fullcalendar/core/locales/fa'
import timeGridPlugin from '@fullcalendar/timegrid'
import { DayTimeColsView } from '@fullcalendar/timegrid/internal'
import Course from '@/components/schedule/Course'
import { convertPersianNumberToEnglish, getDaysOfWeek } from '@/utils/helpers'
import { weekDays } from '@/constants/const'

export default function Schedule({ courses }) {
  const handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`,
      )
    ) {
      clickInfo.event.remove()
    }
  }

  // const handleEvents = (events) => {
  //   setCourses(events)
  // }

  return (
    <div className='h-[700px]'>
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
        // eventsSet={handleEvents}
        slotMinTime={'07:00'}
        slotMaxTime={'20:00'}
        direction='rtl'
        initialDate={'2023-12-30'}
        locale={faLocale}
        firstDay={2}
        height={'700px'}
        views={{
          timeGrid: {
            component: DayTimeColsView,
            usesMinMaxTime: true,
            allDaySlot: false,
            slotDuration: '01:00:00',
            // slotEventOverlap: true,
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
                  title: event.event.title,
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
