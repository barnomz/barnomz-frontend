const Course = ({ courseInfo }) => (
  <div className='flex h-full w-full flex-col items-center justify-between rounded-lg bg-tertiary text-primary-darker'>
    <span>{courseInfo.event.code}</span>
    <span className='font-bold'>{courseInfo.event.title}</span>
    <span>{courseInfo.event.lecturer}</span>
  </div>
)

export default Course
