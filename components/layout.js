import NavBar from '@/components/NavBar'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export default function Layout({ children }) {
  return (
    <div className='bg-primary-dark min-h-screen'>
      <NavBar />
      <main className='h-[calc(100vh-3.75rem)]'>{children}</main>
    </div>
  )
}
