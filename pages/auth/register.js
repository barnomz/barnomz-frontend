import { useState } from 'react'
import { getSession, signIn } from 'next-auth/react'
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
  lengthIsGreaterOrEqualThan,
  valueIsEqualTo,
} from '@/utils/validations'
import BToast from '@/components/dls/toast/BToast'
import { useToast } from '@/components/dls/toast/ToastService'

export default function Register() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })
  const router = useRouter()
  const toast = useToast()
  const successToast = (
    <BToast type='success' message='ثبت‌نام شما موفقیت‌آمیز بود.' />
  )
  const errorToast = (
    <BToast type='error' message='فیلدها را به درستی مقداردهی کنید' />
  )

  const handleRegister = async (isFormValid) => {
    if (!isFormValid) {
      toast.open(errorToast)
      return
    }

    toast.open(successToast)

    const result = await signIn('credentials', {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
      confirmPassword: credentials.confirmPassword,
    })

    if (result.ok && result.url) {
      await router.replace(result.url)
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

  const confirmPasswordValidations = [
    { rule: hasValue, message: 'وارد کردن تکرار رمز عبور الزامی است.' },
    { rule: hasLetter, message: 'رمز عبور باید شامل حروف باشد.' },
    { rule: hasNumber, message: 'رمز عبور باید شامل اعداد باشد.' },
    {
      rule: lengthIsGreaterOrEqualThan(8),
      message: 'رمز عبور باید حداقل ۸ کاراکتر باشد.',
    },
    {
      rule: valueIsEqualTo(credentials.password),
      message: 'رمز عبور و تکرار آن باید یکسان باشند.',
    },
  ]

  return (
    <>
      <Head>
        <title>برنومز | ثبت‌نام</title>
      </Head>
      <div className='flex h-full items-center justify-center'>
        <div className='w-full max-w-md space-y-8 rounded-xl bg-primary/50 p-8 backdrop-blur'>
          <h2 className='text-2xl font-bold text-grey-50'>ثبت‌نام در برنومز</h2>
          <BForm onSubmit={handleRegister}>
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
            <BInputPassword
              required
              label='تکرار رمز عبور'
              placeholder='رمز عبور خود را مجدداً وارد نمایید'
              validations={confirmPasswordValidations}
              onChange={updateField('confirmPassword')}
            />
            <BBtn type='submit' className='mb-4' block>
              ثبت‌نام
            </BBtn>
            <BLink to='/auth/login' postIcon={faArrowLeft} iconSize='1x'>
              قبلا در برنومز ثبت‌نام کرده‌اید؟
            </BLink>
          </BForm>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
