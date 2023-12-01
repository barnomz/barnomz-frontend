import Image from 'next/image'
import logoSvg from '../public/images/barnomz-horizontal-logo.svg'

export default function NavBar() {
  return (
    <div className="px-[1.5rem] py-[0.75rem] h-[3.75rem] w-full flex justify-between items-center bg-primary/50 backdrop-blur">
      <Image src={logoSvg} alt="Barnomz Logo" priority />
    </div>
  )
}
