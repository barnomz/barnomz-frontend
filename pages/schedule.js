import Schedule from '@/components/dls/schedule/Schedule'
import ScheduleTabs from '@/components/dls/schedule/ScheduleTabs'
import Head from 'next/head'

export default function SchedulePage() {
  return (
    <>
      <Head>
        <title>برنومز | برنامه هفتگی</title>
      </Head>
      <div className='flex h-full min-h-[55rem] w-full gap-4 p-6 text-white'>
        <div className='flex grow flex-col justify-between rounded-xl bg-primary/50 p-4 backdrop-blur'>
          <h1 className='text-2xl font-bold'>برنامه هفتگی کلاس‌ها</h1>
          <ScheduleTabs />
          <Schedule />
        </div>

        <div className='min-w-[16rem] rounded-xl bg-primary/50 p-4 backdrop-blur'></div>
      </div>
    </>
  )
}
