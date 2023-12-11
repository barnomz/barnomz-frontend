import { Fragment, useState } from 'react'
import { Tab } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const navigations = [
  {
    id: 1,
    title: 'ساخت برنامه',
    link: '/schedule'
  },
  {
    id: 2,
    title: 'جستجو برنامه',
    link: '/auth/login'
  },
  {
    id: 3,
    title: 'امتحانات',
    link: '/auth/register'
  },
  {
    id: 4,
    title: 'نمره‌دهی به استاتید',
    link: '/lecturers'
  }
]

export default function NavBarMenu() {
  const router = useRouter()

  const [activeNavIndex] = useState(navigations.findIndex(
    (nav) => nav.link === router.asPath
  ))

  return (
    <Tab.Group defaultIndex={activeNavIndex}>
      <Tab.List className='flex gap-2 h-full'>
        {navigations.map((nav) => (
          <Tab key={nav.id} as={Fragment} className='h-full'>
            {({ selected }) => (
              <Link href={nav.link}
                    className={
                      classNames(
                        'h-full text-sm font-bold',
                        'focus:outline-none py-2 px-4 hover:bg-primary rounded-t-md',
                        selected
                          ? 'text-white border-b-4 border-solid border-secondary'
                          : 'text-grey-200 hover:text-white'
                      )
                    }
              >
                {nav.title}
              </Link>
            )}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  )
}
