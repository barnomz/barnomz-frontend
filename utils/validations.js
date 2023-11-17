export function validate(validations, value, inputId) {
  let status = true
  let error = null

  if (!validations?.length) return { status, error }

  for (const validation of validations) {
    if (validation.rule(value)) {
      error = null
      status = true
      continue
    }

    error = validation.message
    status = false
    break
  }

  const inputEl = document.getElementById(inputId)

  if (inputEl) {
    inputEl.dispatchEvent(
      new CustomEvent('validate', {
        detail: { key: inputId, value: status }
      })
    )
  }

  return { status, error }
}

// Validation Book
export function hasValue(value) {
  return !!value?.length
}

export function lengthIsGreaterOrEqualThan(count) {
  return (value) => hasValue(value) && value.length >= count
}

export function lengthIsLessOrEqualThan(count) {
  return (value) => hasValue(value) && value.length <= count
}

export function hasNumber(value) {
  const reg = /\d/
  return reg.test(value)
}

export function hasLetter(value) {
  const reg = /[a-zA-Z]/
  return reg.test(value)
}

export function isEmail(value) {
  const reg = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]{2,48}\.[a-zA-Z]{2,8}$/
  return reg.test(value)
}

export function isPhoneNumber(value) {
  const reg = /^([1-9][0-9]{9})$|^([0][0-9]{10})$/
  return reg.test(value)
}

export function isEmailOrPhoneNumber(value) {
  return isEmail(value) || isPhoneNumber(value)
}
