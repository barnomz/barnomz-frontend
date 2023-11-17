import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import BInput from './BInput';
import BBtn from './BBtn';

const BInputPassword = ({
                          label,
                          labelSlot,
                          labelAsideSlot,
                          placeholder,
                          required = false,
                          icon,
                          readonly = false,
                          disabled = false,
                          wrapperClass,
                          inputClass,
                          error,
                          dir = 'rtl',
                          autofocus = false,
                          autocomplete,
                          validations = [],
                          value,
                          onChange
                        }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  const type = show ? 'text' : 'password';

  const appendSlot = (
    <BBtn
      icon={show ? faEye : faEyeSlash}
      iconSize={24}
      color="grey-text"
      onClick={toggleShow}
    >
      <FontAwesomeIcon icon={show ? faEye : faEyeSlash} size="lg" />
    </BBtn>
  )

  return (
    <BInput
      value={value}
      onChange={onChange}
      label={label}
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
      error={error}
      dir={dir}
      autofocus={autofocus}
      type={type}
      autocomplete={autocomplete}
      validations={validations}
    />
  );
};

export default BInputPassword;
