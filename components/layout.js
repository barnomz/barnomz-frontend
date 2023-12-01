import NavBar from '@/components/NavBar'

export default function Layout({ children }) {
  return (
    <div className='bg-primary-dark min-h-screen'>
      <NavBar />
      <main className='h-[calc(100vh-3.75rem)]'>{children}</main>
    </div>
  )
}
