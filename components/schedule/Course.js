import { cn } from '@/utils/helpers'
import BBtn from '@/components/dls/BBtn'
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons'

const Course = ({ course, ...props }) => {
  const mode = course.mode || 'default'
  if (!['default', 'search', 'hover', 'filter'].includes(mode)) {
    throw new Error(
      'The mode should be either default, search, filter or hover.',
    )
  }

  const isSearch = ['search', 'filter'].includes(mode)

  const wrapperClasses = cn(
    'flex h-full w-full flex-col items-center justify-center cursor-pointer ripple',
    'gap-1 rounded-lg py-2',
    isSearch ? 'text-grey-50' : 'text-primary-darker',
    mode === 'hover' && 'bg-grey-300',
    isSearch && 'bg-primary-lighter',
    mode === 'default' && 'bg-tertiary-dark',
    props.className,
  )
  return (
    <div className={wrapperClasses}>
      <span>
        {course.course_code}-{course.group}
      </span>
      <span className='font-bold'>{course.course_name}</span>
      <span>{course.presented_by}</span>
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
