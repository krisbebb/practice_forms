import {
  useState
} from 'react'

const useForm = (validateInput, type) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState({})

  let valueIsValid = false
  let hasError = false

  if (type === 'input') {
    valueIsValid = inputValue.trim() !== "" && validateInput(inputValue);
    hasError = !valueIsValid && isTouched;
  }
  if (type === 'checkboxes') {
    valueIsValid = validateInput(checkboxValues);
    hasError = !valueIsValid
  }

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
    if (type === 'input') {
      setInputValue('')
      setIsTouched(false)
    }
    if (type === 'checkboxes') {
      setCheckboxValues({})
    }
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