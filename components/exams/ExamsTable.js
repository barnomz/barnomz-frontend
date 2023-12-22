import { examsTableHeaders } from '@/constants/const'
import BBtn from '@/components/dls/BBtn'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { getDaysOfWeek } from '@/utils/helpers'

const courses = [
  {
    id: 1,
    code: 'CSE101-1',
    title: 'برنامه‌سازی وب',
    lecturer: 'محمدرضا محمدی',
    daysOfWeek: getDaysOfWeek([1, 3]),
    startTime: '13:30',
    endTime: '15:00',
    credit: '3',
    group: '1',
    examDate: '2023-12-22T09:00',
  },
  {
    id: 2,
    code: 'CSE102-2',
    title: 'یادگیری ماشین',
    lecturer: 'ابولفضل مطهری',
    daysOfWeek: getDaysOfWeek([0, 2]),
    startTime: '09:00',
    endTime: '10:30',
    credit: '3',
    examDate: '2023-12-23T13:00',
    group: '2',
  },
]

export default function ExamsTable() {
  const renderProperty = (property, key) => {
    if (key !== 'examDate') return property
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      hour12: false,
      timeZone: 'Asia/Tehran',
    })
      .format(new Date(property))
      .toString()
  }

  const totalCreditSum = courses.reduce(
    (sum, { credit }) => sum + Number(credit),
    0,
  )

  return (
    <div className='exams-table relative overflow-x-auto rounded-md shadow-md'>
      <table className='w-full border-2 border-solid border-primary-light text-right text-sm'>
        <thead className='bg-primary-light text-xs text-grey-100'>
          <tr>
            {examsTableHeaders.map((header) => (
              <th key={header.key} scope='col' className='px-6 py-3'>
                {header.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className='border-b border-primary-light'>
              {examsTableHeaders.map(({ key, _ }, i) => (
                <td key={key} className='px-6 py-3'>
                  {i !== examsTableHeaders.length - 1 ? (
                    renderProperty(course[key], key)
                  ) : (
                    <BBtn
                      icon={faTimes}
                      className='h-6 w-6 rounded-full bg-error !px-2 hover:bg-error-500'
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className='font-medium text-white'>
            <td></td>
            <td></td>
            <td className='px-6 py-3'>جمع</td>
            <td className='px-6 py-3'>{totalCreditSum}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
