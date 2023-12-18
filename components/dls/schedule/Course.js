const Course = ({ course }) => (
  <div className='flex h-full w-full flex-col items-center justify-center gap-1 rounded-lg bg-tertiary text-primary-darker'>
    <span>{course.code}</span>
    <span className='font-bold'>{course.title}</span>
    <span>{course.lecturer}</span>
  </div>
)

export default Course
