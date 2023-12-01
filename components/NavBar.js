import Image from 'next/image'
import logoSvg from '../public/images/barnomz-horizontal-logo.svg'
import BBtn from '@/components/BBtn'

export default function NavBar() {
  return (
    <div className="px-[1.5rem] py-[0.75rem] h-[3.75rem] w-full flex justify-between items-center bg-primary/50 backdrop-blur">
      <Image src={logoSvg} alt="Barnomz Logo" />
      <div className='flex gap-4'>
        <BBtn to='/auth/login' color='primary' className='h-[2.25rem]'>
          ورود
        </BBtn>
        <BBtn to='/auth/register' className='h-[2.25rem]'>
          ثبت‌نام
        </BBtn>
      </div>
    </div>
  )
}
