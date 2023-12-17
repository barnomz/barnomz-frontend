import Schedule from '@/components/dls/schedule/Schedule'
import Head from 'next/head'

export default function SchedulePage() {
  return (
    <>
      <Head>
        <title>برنومز | برنامه هفتگی</title>
      </Head>
      <div className='flex h-full w-full gap-4 p-6 text-white'>
        <div className='grow space-y-4 rounded-xl bg-primary/50 p-4 backdrop-blur'>
          <h1 className='text-2xl font-bold'>برنامه هفتگی کلاس‌ها</h1>
          <Schedule></Schedule>
        </div>

        <div className='min-w-[16rem] rounded-xl bg-primary/50 p-4 backdrop-blur'></div>
      </div>
    </>
  )
}
