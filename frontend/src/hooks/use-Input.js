import { useState } from "react";

const useInput = ({ initialValue = "", validateValue }) => {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
    setIsTouched(true);
  };

  const validateValueHandler = () => {
    setIsTouched(false);
    return validateValue(value);
  };

  const focusHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue(initialValue);
    setIsTouched(false);
  };

  return {
    value: value || "", // Ensure returning a string
    isValid: validateValue(value),
    hasError: isTouched && !validateValue(value),
    valueChangeHandler,
    validateValueHandler,
    focusHandler,
    isFocused: isTouched,
    reset,
  };
};

export default useInput;
