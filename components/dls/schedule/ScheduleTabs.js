import { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import { tabs } from '@/constants/const'
import BBtn from '@/components/dls/BBtn'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ScheduleTabs() {
  return (
    <Tab.Group>
      <Tab.List className='flex gap-2'>
        {tabs.map((nav) => (
          <Tab key={nav.id} as={Fragment} className='h-full'>
            {({ selected }) => (
              <button
                className={classNames(
                  'h-full text-sm font-bold',
                  'rounded-md px-4 py-2 focus-visible:outline-none',
                  selected
                    ? 'bg-secondary/30 text-secondary ring-2 ring-secondary'
                    : 'text-grey-200 hover:bg-white/10 hover:text-white',
                )}
              >
                {nav.title}
              </button>
            )}
          </Tab>
        ))}
        <BBtn
          icon={faPlus}
          size='sm'
          iconSize='lg'
          color='primary-light'
          className='h-full rounded-lg'
        />
      </Tab.List>
    </Tab.Group>
  )
}
