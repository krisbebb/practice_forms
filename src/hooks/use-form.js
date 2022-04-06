import {
  useState
} from 'react'

const useForm = (validateInput, type) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState({})

  let valueIsValid = false
  if (type === 'input') {
    valueIsValid = inputValue.trim() !== "" && validateInput(inputValue);
  }
  if (type === 'checkboxes') {
    valueIsValid = validateInput(checkboxValues);

  }
  const hasError = !valueIsValid && isTouched;

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const checkboxChangeHandler = (event) => {
    setCheckboxValues({
      ...checkboxValues,
      [event.target.value]: event.target.checked
    })
  }

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setInputValue('')
    setIsTouched(false)
  }

  return {
    value: inputValue,
    checkboxValues,
    isValid: valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    checkboxChangeHandler,
    reset
  }
}

export default useForm