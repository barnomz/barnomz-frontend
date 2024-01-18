import Image from 'next/image'
import logoSvg from '@/public/images/barnomz-horizontal-logo.svg'
import BBtn from '@/components/dls/BBtn'
import { signOut, useSession } from 'next-auth/react'
import NavBarMenu from '@/components/NavBarMenu'
import Link from 'next/link'

export default function NavBar() {
  // const { session } = useSession()
  const session = true

  const navBarEndLoggedIn = (
    <BBtn
      color='primary'
      className='h-[2.25rem]'
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      خروج
    </BBtn>
  )

  const navBarEndLoggedOut = (
    <div className='flex gap-4'>
      <BBtn to='/auth/login' color='primary' className='h-[2.25rem]'>
        ورود
      </BBtn>
      <BBtn to='/auth/register' className='h-[2.25rem]'>
        ثبت‌نام
      </BBtn>
    </div>
  )

  return (
    <div className='sticky flex h-[3.75rem] w-full items-center justify-between bg-primary/50 px-[1.5rem] py-[0.75rem] backdrop-blur'>
      <Link href={'/'}>
        <Image src={logoSvg} alt='Barnomz Logo' priority />
      </Link>
      {session && <NavBarMenu />}
      {session ? navBarEndLoggedIn : navBarEndLoggedOut}
    </div>
  )
}
