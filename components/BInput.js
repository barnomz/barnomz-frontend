import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { validate } from '@/utils/validations'

const BInput = ({
                  label,
                  labelSlot,
                  labelAsideSlot,
                  appendSlot,
                  placeholder,
                  required = false,
                  icon,
                  type = 'text',
                  readonly = false,
                  disabled = false,
                  wrapperClass,
                  inputClass,
                  dir = 'rtl',
                  autofocus = false,
                  autocomplete,
                  validations = [],
                  value,
                  onChange,
                  ...props
                }) => {
  const [id, setId] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setId(String(Math.floor(Math.random() * 99999999)))
    if (autofocus) {
      setTimeout(() => {
        const inputEl = document.getElementById(`input-${id}`)
        inputEl?.focus()
      }, 0)
    }
  }, [autofocus])

  const handleValidation = (event) => {
    const validationResult = validate(
      validations,
      event.target.value,
      `input-${id}`
    )
    setError(validationResult.error)
    if (onChange) {
      onChange(event)
    }
  }

  const wrapperClasses = [
    'bg-primary px-3 flex items-center gap-x-2 rounded',
    'focus-within:border-secondary duration-150',
    'h-[46px] sm:h-[57px]',
    error ? '!border-error' : '',
    wrapperClass
  ].join(' ')

  const inputClasses = [
    'grow !bg-transparent !text-transparent outline-none',
    'text-sm sm:text-base',
    'text-grey-50 placeholder:text-grey-200 placeholder:text-start',
    'w-full h-[46px] sm:h-[57px]',
    inputClass
  ].join(' ')

  return (
    <div className='flex flex-col gap-y-1' {...props}>
      {(label || labelSlot || labelAsideSlot) && (
        <div className='flex items-center justify-between'>
          <label
            htmlFor={`input-${id}`}
            className={`text-xs sm:text-sm font-medium ${disabled ? 'text-grey-700' : 'text-grey-50'}`}
          >
            {label && (
              <>
                {label}
                {required && <span className={`${disabled ? 'text-grey-700' : 'text-error'}`}>*</span>}
              </>
            )}
          </label>
        </div>
      )}

      <div className={wrapperClasses}>
        {icon && (
          <div className='flex items-center justify-center'>
            <FontAwesomeIcon
              icon={icon}
              className={disabled ? 'text-grey-700' : 'text-grey-50'}
            />
          </div>
        )}

        <input
          id={`input-${id}`}
          value={value}
          placeholder={placeholder}
          className={inputClasses}
          type={type}
          readOnly={readonly}
          disabled={disabled}
          dir={dir}
          autoComplete={autocomplete}
          onInput={handleValidation}
          onChange={handleValidation}
        />

        {appendSlot &&
          (<div
            className='tw-flex tw-items-center tw-justify-center'
          >
            {appendSlot}
          </div>)}
      </div>

      <div className='text-error text-xs min-h-[24px]'>
        {error && <span>{error}</span>}
      </div>
    </div>
  )
}

export default BInput
