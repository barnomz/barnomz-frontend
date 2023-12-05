import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import BInput from './BInput'
import BBtn from './BBtn'

const BInputPassword = ({
  label,
  hideLabel = false,
  labelSlot,
  labelAsideSlot,
  placeholder,
  required = false,
  icon,
  readonly = false,
  disabled = false,
  wrapperClass,
  inputClass,
  dir = 'ltr',
  autofocus = false,
  autocomplete,
  validations = [],
  onChange,
  ...props
}) => {
  const [show, setShow] = useState(false)

  const toggleShow = () => {
    setShow(!show)
  }

  const type = show ? 'text' : 'password'

  const appendSlot = (
    <BBtn
      icon={show ? faEye : faEyeSlash}
      iconSize={'sm'}
      color='grey-text'
      onClick={toggleShow}
    >
      <FontAwesomeIcon icon={show ? faEye : faEyeSlash} size='lg' />
    </BBtn>
  )

  return (
    <BInput
      label={label}
      hideLabel={hideLabel}
      labelSlot={labelSlot}
      labelAsideSlot={labelAsideSlot}
      appendSlot={appendSlot}
      placeholder={placeholder}
      required={required}
      icon={icon}
      readonly={readonly}
      disabled={disabled}
      wrapperClass={wrapperClass}
      inputClass={inputClass}
      dir={dir}
      autofocus={autofocus}
      type={type}
      autocomplete={autocomplete}
      validations={validations}
      onChange={onChange}
      {...props}
    />
  )
}

export default BInputPassword
