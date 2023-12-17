import { getSession } from 'next-auth/react'

export default function SchedulePage() {
  return <></>
}

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
