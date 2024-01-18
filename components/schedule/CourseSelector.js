import CollegeCombobox from '@/components/schedule/CollegeCombobox'
import BInput from '@/components/dls/BInput'
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Disclosure } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getDaysOfWeek } from '@/utils/helpers'
import { useState } from 'react'
import Course from '@/components/schedule/Course'

const colleges = [
  { id: 1, name: 'ممد' },
  { id: 2, name: 'اصغر ممد' },
  { id: 3, name: 'احمد' },
  { id: 4, name: 'ممد1' },
  { id: 5, name: 'اصغر ممد1' },
  { id: 6, name: 'احمد1' },
  { id: 7, name: 'ممد2' },
  { id: 8, name: 'اصغر ممد2' },
  { id: 9, name: 'احمد2' },
  { id: 10, name: 'ممد3' },
  { id: 11, name: 'اصغر ممد3' },
  { id: 12, name: 'احمد3' },
  { id: 13, name: 'ممد4' },
  { id: 14, name: 'اصغر ممد4' },
  { id: 15, name: 'احمد4' },
  { id: 16, name: 'ممد5' },
  { id: 17, name: 'اصغر ممد5' },
  { id: 18, name: 'احمد5' },
  { id: 19, name: 'ممد6' },
  { id: 20, name: 'اصغر ممد6' },
  { id: 21, name: 'احمد6' },
]

const coursesGroups = [
  [
    {
      id: 1,
      code: 'CSE101-1',
      title: 'برنامه‌سازی وب',
      lecturer: 'محمدرضا محمدی',
      daysOfWeek: getDaysOfWeek([1, 3]),
      startTime: '13:30',
      endTime: '15:00',
    },
    {
      id: 2,
      code: 'CSE101-2',
      title: 'برنامه‌سازی وب',
      lecturer: 'ابولفضل مطهری',
      daysOfWeek: getDaysOfWeek([0, 2]),
      startTime: '09:00',
      endTime: '10:30',
    },
  ],
  [
    {
      id: 3,
      code: 'CSE102-1',
      title: 'یادگیری ماشین',
      lecturer: 'محمدرضا محمدی',
      daysOfWeek: getDaysOfWeek([1, 3]),
      startTime: '13:30',
      endTime: '15:00',
    },
    {
      id: 4,
      code: 'CSE102-2',
      title: 'یادگیری ماشین',
      lecturer: 'ابولفضل مطهری',
      daysOfWeek: getDaysOfWeek([0, 2]),
      startTime: '09:00',
      endTime: '10:30',
    },
  ],
  [
    {
      id: 5,
      code: 'CSE103-1',
      title: 'طراحی پایگاه داده‌ها',
      lecturer: 'محمدرضا محمدی',
      daysOfWeek: getDaysOfWeek([1, 3]),
      startTime: '13:30',
      endTime: '15:00',
    },
    {
      id: 6,
      code: 'CSE103-2',
      title: 'طراحی پایگاه داده‌ها',
      lecturer: 'ابولفضل مطهری',
      daysOfWeek: getDaysOfWeek([0, 2]),
      startTime: '09:00',
      endTime: '10:30',
    },
  ],
]

export default function CourseSelector({ mode = 'search' }) {
  if (!['search', 'filter'].includes(mode)) {
    throw new Error('The mode should be either search or filter.')
  }

  const [query, setQuery] = useState('')
  const filteredCoursesGroups =
    query === ''
      ? coursesGroups
      : coursesGroups.filter((coursesGroup) =>
          coursesGroup.some(
            (course) =>
              course.code.match(query) ||
              course.title.match(query) ||
              course.lecturer.match(query),
          ),
        )

  return (
    <div className='min-w-[20rem] max-w-[20rem] space-y-4 rounded-xl bg-primary/50 p-4 backdrop-blur'>
      <div className='flex items-center justify-between text-xs'>
        <h4>تعداد واحدهای انتخاب‌شده</h4>
        <span>{}</span>
      </div>

      <CollegeCombobox colleges={colleges} />
      <BInput
        icon={faSearch}
        placeholder='درس مورد نظر را جستجو کنید.'
        dir='rtl'
        wrapperClass='shadow-md'
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className='max-h-[38.5rem] space-y-4 overflow-auto'>
        {filteredCoursesGroups.map((coursesGroup, i) => (
          <div
            key={i}
            className='rounded-lg bg-grey-300 text-primary-darker transition-all'
          >
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className='flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium focus:outline-none'>
                    <span>{coursesGroup[0].title}</span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } text-purple-500 h-5 w-5 transition-all`}
                    />
                  </Disclosure.Button>
                  {open && (
                    <Disclosure.Panel className='space-y-4 px-4 pb-2 text-sm'>
                      {coursesGroup.map((course) => (
                        <Course key={course.id} course={course} mode={mode} />
                      ))}
                    </Disclosure.Panel>
                  )}
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </div>
  )
}
