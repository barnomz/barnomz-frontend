import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import BForm from '@/components/dls/BForm'
import BInput from '@/components/dls/BInput'
import BInputPassword from '@/components/dls/BInputPassword'
import BBtn from '@/components/dls/BBtn'
import Head from 'next/head'
import BLink from '@/components/dls/BLink'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {
  hasLetter,
  hasNumber,
  hasValue,
  lengthIsEqualTo,
  lengthIsGreaterOrEqualThan,
} from '@/utils/validations'
import { useToast } from '@/components/dls/toast/ToastService'
import { getSessionFromCookie } from '@/helpers/getSessionFromCookie'

export default function Login() {
  const router = useRouter()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const handleLogin = async (isFormValid) => {
    if (!isFormValid) return

    setIsLoading(true)
    const result = await signIn('credentials', {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
    })
    setIsLoading(false)

    if (result.ok && result.url) {
      await router.replace(result.url)
    } else {
      console.error('Login failed:', result.error)
      // check status code and show appropriate message
      if (result.error === 'CredentialsSignin') {
        toast.open({ message: 'ورود ناموفق بود.', type: 'error' })
      } else {
        toast.open({ message: 'خطایی رخ داده است.', type: 'error' })
      }
    }
  }

  const updateField = (field) => (event) => {
    setCredentials({
      ...credentials,
      [field]: event.target.value,
    })
  }

  const usernameValidations = [
    { rule: hasValue, message: 'وارد کردن نام کاربری الزامی است.' },
    {
      rule: lengthIsGreaterOrEqualThan(5),
      message: 'نام کاربری باید حداقل ۵ کاراکتر باشد.',
    },
  ]

  const passwordValidations = [
    { rule: hasValue, message: 'وارد کردن رمز عبور الزامی است.' },
    { rule: hasLetter, message: 'رمز عبور باید شامل حروف باشد.' },
    { rule: hasNumber, message: 'رمز عبور باید شامل اعداد باشد.' },
    {
      rule: lengthIsGreaterOrEqualThan(8),
      message: 'رمز عبور باید حداقل ۸ کاراکتر باشد.',
    },
  ]

  return (
    <>
      <Head>
        <title>برنومز | ورود</title>
      </Head>
      <div className='flex h-full items-center justify-center'>
        <div className='w-full max-w-md space-y-8 rounded-xl bg-primary/50 p-8 backdrop-blur'>
          <h2 className='text-2xl font-bold text-grey-50'>ورود به برنومز</h2>
          <BForm onSubmit={handleLogin}>
            <BInput
              required
              label='نام کاربری'
              placeholder='نام کاربری خود را وارد نمایید'
              validations={usernameValidations}
              onChange={updateField('username')}
            />
            <BInputPassword
              required
              label='رمز عبور'
              placeholder='رمز عبور خود را وارد نمایید'
              validations={passwordValidations}
              onChange={updateField('password')}
            />
            <BBtn type='submit' className='mb-4' block loading={isLoading}>
              ورود
            </BBtn>
            <BLink
              to='/auth/register'
              iconSize='1x'
              postIcon={faArrowLeft}
              className='mx-auto max-w-fit'
            >
              ثبت‌نام نکرده‌اید؟
            </BLink>
          </BForm>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSessionFromCookie({ req })

  if (session) {
    return {
      redirect: {
        destination: '/schedules',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
