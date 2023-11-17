import { useState, useEffect, useRef } from 'react';

const BForm = ({ onSubmit, children }) => {
  const [formIsValid, setFormIsValid] = useState(true);
  const inputElements = useRef(null);
  const inputStatuses = useRef([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(validateAll());
    }
  };

  useEffect(() => {
    inputElements.current = document.getElementsByTagName('input');
    // Add event listeners
    for (const inputEl of inputElements.current) {
      inputEl.addEventListener('validate', setInputStatus);
    }

    // Remove event listeners
    return () => {
      for (const inputEl of inputElements.current) {
        inputEl.removeEventListener('validate', setInputStatus);
      }
    };
  }, []);

  const setInputStatus = (event) => {
    const statusIndex = inputStatuses.current.findIndex(
      (status) => status.key === event.detail.key
    );

    if (statusIndex >= 0) {
      inputStatuses.current[statusIndex].value = event.detail.value;
    } else {
      inputStatuses.current.push({
        key: event.detail.key,
        value: event.detail.value,
      });
    }

    setFormIsValid(inputStatuses.current.every((status) => status.value));
  };

  const validateAll = () => {
    for (const inputEl of inputElements.current) {
      inputEl.dispatchEvent(new Event('input'));
    }
    return formIsValid;
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {children}
    </form>
  );
};

export default BForm;
