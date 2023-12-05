import ReCAPTCHA from 'react-google-recaptcha'
import api from '@/services/api'
import { useRef, useState } from 'react'

const Recaptcha = () => {
  const recaptchaRef = useRef(null)

  async function handleCaptchaSubmission(token) {
    await api.auth.verifyCaptcha(token)
  }
  return (
    <>
      <ReCAPTCHA
        sitekey='6LcdtiYpAAAAALItP67_xaGLubGhk9ijAgXkXi90'
        ref={recaptchaRef}
        onChange={handleCaptchaSubmission}
      />
    </>
  )
}
export default Recaptcha
