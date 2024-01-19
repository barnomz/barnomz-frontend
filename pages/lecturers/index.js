import BInput from '@/components/dls/BInput'
import {
  faCircleXmark,
  faSearch,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import BBtn from '@/components/dls/BBtn'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

export default function LecturersPage({ lecturers }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredLecturers, setFilteredLecturers] = useState([])

  useEffect(() => {
    if (!searchQuery) return setFilteredLecturers([])
    setFilteredLecturers(
      lecturers.filter(
        (lecturer) =>
          lecturer.name.includes(searchQuery) ||
          lecturer.college.includes(searchQuery),
      ),
    )
  }, [searchQuery])

  const clearIcon = (
    <BBtn
      color=''
      icon={faCircleXmark}
      className='hover:bg-transparent rounded-full !p-0 text-grey-200 hover:text-error'
      iconSize='xl'
      onClick={() => setSearchQuery('')}
    />
  )

  return (
    <div className='flex h-full max-h-[55rem] min-h-[55rem] justify-center p-4 md:p-8'>
      <div className='flex w-full max-w-[45rem] flex-col gap-8'>
        <BInput
          value={searchQuery}
          placeholder='جستجوی استاد'
          icon={faSearch}
          appendSlot={clearIcon}
          dir='rtl'
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className='flex flex-col divide-y divide-primary-light overflow-y-auto overflow-x-hidden'>
          <AnimatePresence initial={false}>
            {filteredLecturers.map((lecturer) => (
              <motion.div
                key={lecturer.id}
                layout
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={`/lecturers/${lecturer.id}`}
                  className='flex items-center justify-between gap-4 p-4 transition-all hover:bg-primary/20'
                >
                  <div className='flex items-center justify-center gap-4'>
                    <FontAwesomeIcon
                      icon={faUser}
                      size='2x'
                      className='rounded-xl bg-primary p-1 pb-0 text-grey-300 shadow-lg'
                    />
                    <span className='text-xl text-grey-200'>
                      {lecturer.name}
                    </span>
                  </div>
                  <span className='text-sm text-grey-200'>
                    {lecturer.college}
                  </span>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  // fetch lecturers from /lecturers
  // const lecturers = await api.lecturer
  //   .fetchAllLecturers()
  //   .then((res) => res.data)
  const lecturers = [
    {
      id: 1,
      name: 'محمد نظری',
      college: 'مهندسی کامپیوتر',
      numberOfVotes: 100,
      rate: {
        teachQuality: 1,
        scoring: 3,
        morality: 4.7,
      },
    },
    {
      id: 2,
      name: 'علی امیری',
      college: 'مهندسی برق',
      numberOfVotes: 100,
      rate: {
        teachQuality: 1,
        scoring: 3,
        morality: 4.7,
      },
    },
    {
      id: 3,
      name: 'حمیدرضا ربیعی',
      college: 'مهندسی کامپیوتر',
      numberOfVotes: 100,
      rate: {
        teachQuality: 1,
        scoring: 3,
        morality: 4.7,
      },
    },
    {
      id: 4,
      name: 'مهدی  صفرنژاد',
      college: 'مهندسی کامپیوتر',
      numberOfVotes: 100,
      rate: {
        teachQuality: 1,
        scoring: 3,
        morality: 4.7,
      },
    },
    {
      id: 5,
      name: 'محمد نظری',
      college: 'مهندسی کامپیوتر',
      numberOfVotes: 100,
      rate: {
        teachQuality: 1,
        scoring: 3,
        morality: 4.7,
      },
    },
    {
      id: 6,
      name: 'احمد الهی',
      college: 'شیمی',
      numberOfVotes: 100,
      rate: {
        teachQuality: 1,
        scoring: 3,
        morality: 4.7,
      },
    },
    {
      id: 7,
      name: 'سپیده صفری',
      college: 'مهندسی کامپیوتر',
      numberOfVotes: 100,
      rate: {
        teachQuality: 1,
        scoring: 3,
        morality: 4.7,
      },
    },
    {
      id: 8,
      name: 'محسن انصاری',
      college: 'مهندسی کامپیوتر',
      numberOfVotes: 100,
      rate: {
        teachQuality: 1,
        scoring: 3,
        morality: 4.7,
      },
    },
    {
      id: 9,
      name: 'محمدامین فضلی',
      college: 'مهندسی کامپیوتر',
      numberOfVotes: 100,
      rate: {
        teachQuality: 1,
        scoring: 3,
        morality: 4.7,
      },
    },
    {
      id: 10,
      name: 'محمدمهدی سمیعی',
      college: 'مهندسی کامپیوتر',
      numberOfVotes: 100,
      rate: {
        teachQuality: 1,
        scoring: 3,
        morality: 4.7,
      },
    },
    {
      id: 11,
      name: 'محمد نظری ۲',
      college: 'مهندسی کامپیوتر',
      numberOfVotes: 100,
      rate: {
        teachQuality: 1,
        scoring: 3,
        morality: 4.7,
      },
    },
  ]

  return {
    props: { lecturers },
  }
}
