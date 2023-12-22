import { cn } from '@/utils/helpers'
import BBtn from '@/components/dls/BBtn'
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons'

const Course = ({ course, mode = 'default', ...props }) => {
  if (!['default', 'search', 'hover', 'filter'].includes(mode)) {
    throw new Error(
      'The mode should be either default, search, filter or hover.',
    )
  }

  const isSearch = ['search', 'filter'].includes(mode)

  const wrapperClasses = cn(
    'flex h-full w-full flex-col items-center justify-center',
    'gap-1 rounded-lg py-2',
    isSearch ? 'text-grey-50' : 'text-primary-darker',
    {
      'bg-tertiary': mode === 'default',
      'bg-primary-lighter': isSearch,
      'bg-grey-300': mode === 'hover',
    },
    props.className,
  )
  return (
    <div className={wrapperClasses}>
      <span>{course.code}</span>
      <span className='font-bold'>{course.title}</span>
      <span>{course.lecturer}</span>
      {mode === 'search' && (
        <BBtn className='h-[2.1875rem]' preIcon={faPlus} iconSize={'sm'}>
          اضافه کردن
        </BBtn>
      )}
      {mode === 'filter' && <BBtn preIcon={faFilter}>فیلتر کردن</BBtn>}
    </div>
  )
}

export default Course
