import { cn, convertEnglishNumberToPersian } from '@/utils/helpers'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function LecturerInfo({ lecturer }) {
  const info = [
    { key: 'نام استاد', value: lecturer.name },
    { key: 'دانشکده', value: lecturer.college },
  ]
  const ratings = [
    { key: 'تدریس', value: lecturer.rate.teachQuality },
    { key: 'نمره‌دهی', value: lecturer.rate.scoring },
    { key: 'اخلاق', value: lecturer.rate.morality },
  ]
  const numberOfVotesPersian = convertEnglishNumberToPersian(
    lecturer.numberOfVotes,
  )
  const getRatingColorClass = (rating) => {
    if (rating >= 4) return 'bg-secondary'
    if (rating >= 2.5) return 'bg-tertiary'
    return 'bg-error-500'
  }
  return (
    <div className='min-w-[20rem] max-w-[20rem] space-y-4 rounded-xl bg-primary/50 p-4 backdrop-blur'>
      <h4 className='text-2xl font-bold text-white'>نمره‌دهی به اساتید</h4>
      <div className='flex justify-center'>
        <FontAwesomeIcon
          icon={faUser}
          size='10x'
          className='rounded-xl bg-primary p-6 pb-0 text-grey-300 shadow-lg'
        />
      </div>
      <div className='flex flex-col gap-2 rounded-lg border-[1px] border-solid border-primary-light p-3'>
        {info.map((item) => (
          <div key={item.key} className='flex items-center justify-between'>
            <span className='text-xs text-grey-100'>{item.key}</span>
            <span className='text-white'>{item.value}</span>
          </div>
        ))}
      </div>

      <div className='mb-4 mt-8 flex items-center justify-between'>
        <span>میانگین امتیازها</span>
        <span className='text-sm'>{numberOfVotesPersian} رای</span>
      </div>

      <div className='flex flex-col gap-2 rounded-lg border-[1px] border-solid border-primary-light p-3'>
        {ratings.map((item) => (
          <div key={item.key} className='flex h-6 gap-2'>
            <div className='flex w-2/5 items-center justify-between text-grey-50 '>
              <span className='text-xs'>{item.key}</span>
              <span className='text-sm'>{item.value}</span>
            </div>
            <div dir='ltr' className='mr-auto w-3/5 rounded bg-primary-light'>
              <div
                className={cn(
                  'h-full rounded pr-2',
                  getRatingColorClass(item.value),
                )}
                dir='rtl'
                style={{ width: `${(item.value / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
