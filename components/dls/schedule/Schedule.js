import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { DayTimeColsView } from '@fullcalendar/timegrid/internal'
import Course from '@/components/dls/schedule/Course'

let eventGuid = 0

export function createEventId() {
  return String(eventGuid++)
}

const weekDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه']

export default function SchedulePage() {
  const [courses, setCourses] = useState([
    {
      id: createEventId(),
      code: 'CSE101',
      title: 'مبانی کامپیوتر',
      lecturer: 'محمدرضا محمدی',
      start: '2023-12-18T12:00:00',
      end: '2023-12-18T13:00:00',
    },
    {
      id: createEventId(),
      code: 'CSE102',
      title: 'طراحی وب',
      lecturer: 'محمد نظری',
      start: '2023-12-20T10:00:00',
      end: '2023-12-20T13:00:00',
    },
  ])

  const handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`,
      )
    ) {
      clickInfo.event.remove()
    }
  }

  const handleEvents = (events) => {
    setCourses(events)
  }

  const renderEventContent = (courseInfo) => {
    return <Course courseInfo={courseInfo}></Course>
  }

  return (
    <FullCalendar
      plugins={[timeGridPlugin]}
      initialView='timeGridWeek'
      headerToolbar={false}
      editable={false}
      selectable={false}
      selectMirror
      expandRows
      dayMaxEvents
      weekends
      initialEvents={courses}
      eventContent={renderEventContent}
      eventClick={handleEventClick}
      eventsSet={handleEvents}
      slotMinTime={'07:00'}
      slotMaxTime={'20:00'}
      firstDay={6}
      direction='rtl'
      views={{
        timeGrid: {
          component: DayTimeColsView,
          usesMinMaxTime: true,
          allDaySlot: false,
          slotDuration: '01:00:00',
          slotEventOverlap: true,
          duration: { days: 6 },
          slotLabelContent: ({ date }) => (
            <div className='me-2 text-sm font-medium'>
              {date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                hour12: false,
              })}
            </div>
          ),
          dayHeaderContent: ({ date }) => (
            <div className='pb-2 text-sm font-medium'>
              {weekDays[date.getDay()]}
            </div>
          ),
          eventContent: (courseInfo) => {
            console.log(courseInfo)
            return <Course courseInfo={courseInfo}></Course>
          },
        },
      }}
    />
  )
}
