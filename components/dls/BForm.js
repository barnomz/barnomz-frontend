import { useEffect, useRef, useState } from 'react'

const BForm = ({ onSubmit, children }) => {
  const form = useRef(null)
  const [inputElements, setInputElements] = useState([])

  useEffect(() => {
    setTimeout(() => {
      const elements = form.current.getElementsByTagName('input')
      setInputElements(Array.from(elements))
    }, 10)
  }, [])

  useEffect(() => {
    validateAll(false)
  }, [inputElements])

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (onSubmit) {
      validateAll().then((isFormValid) => {
        console.log('isFormValid', isFormValid)
        onSubmit(isFormValid)
      })
    }
  }

  const validateAll = (showError = true) => {
    return new Promise((resolve) => {
      const results = Array.from(inputElements).map((inputEl) => {
        // inputEl.dispatchEvent(new Event('input', { bubbles: true }))
        console.log('inputEl.value', inputEl.value)
        const { status } = inputEl.validate(
          { target: { value: inputEl.value } },
          showError,
        )
        return { status }
      })
      setTimeout(() => {
        resolve(results.every((result) => result.status))
      }, 0)
    })
  }

  return (
    <form ref={form} onSubmit={handleFormSubmit}>
      {children}
    </form>
  )
}

export default BForm
