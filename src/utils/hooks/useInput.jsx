import { useState } from 'react';

const useInput = ({ inputValue = '' }) => {
  const [value, setValue] = useState(inputValue);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const reset = () => {
    setValue(inputValue);
    setErrorMessage('');
    setIsError(false);
  };

  const onChange = (evt) => {
    setValue(evt.target.value);
    setIsError(!evt.target.validity.valid);
    setErrorMessage(evt.target.validationMessage);
  };

  return { value, setValue, isError, errorMessage, reset, onChange };
};

export default useInput;
