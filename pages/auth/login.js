import { useState } from 'react'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import BForm from '@/components/BForm'
import BInput from '@/components/BInput'
import BInputPassword from '@/components/BInputPassword'
import BBtn from '@/components/BBtn'

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const router = useRouter()

  const handleLogin = async (event) => {
    event.preventDefault()

    const result = await signIn('credentials', {
      redirect: false,
      username: credentials.username,
      password: credentials.password
    })

    if (result.ok && result.url) {
      await router.replace(result.url)
    }
    // You can check for error handling with `result.error`
  }

  const updateField = (field) => (event) => {
    setCredentials({
      ...credentials,
      [field]: event.target.value
    })
  }

  return (
    <div className='h-full bg-dark-blue flex justify-center items-center'>
      <div className='w-full max-w-md p-8 space-y-8 bg-light-blue rounded-xl'>
        <h2 className='text-2xl text-grey-50 font-bold'>ورود به برنومز</h2>
        <BForm onSubmit={handleLogin}>
          <BInput
            label='نام کاربری'
            placeholder='نام کاربری خود را وارد نمایید'
            value={credentials.username}
            onChange={updateField('username')}
          />
          <BInputPassword
            label='رمز عبور'
            placeholder='رمز عبور خود را وارد نمایید'
            value={credentials.password}
            onChange={updateField('password')}
          />
          <BBtn type='submit' block>
            ورود
          </BBtn>
        </BForm>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}
