import useClientSideRedirect from '@/hooks/useClientSideRedirect'

export default function LecturersPage() {
  useClientSideRedirect('/lecturers', '/lecturers/1')
  return <div></div>
}
