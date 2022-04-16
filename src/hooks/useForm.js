import { useState } from "react";

const useForm = (validators) => {
  const [state, setState] = useState({});

  let valueIsValid = false;
  let hasError = false;

  const handleChange = (e) => {
    let { type, name, value = "", checked } = e.target;

    if (type === "checkbox") {
      setState((state) => ({
        ...state,
        [name]: {
          isTouched: false,
          ...state[name],
          checked: state[name]
            ? { ...state[name].checked, [value]: checked }
            : { [value]: checked },

          type,
        },
      }));
    } else {
      setState((state) => ({
        ...state,
        [name]: {
          isTouched: false,
          ...state[name],
          input: value,
          isValid: !!valueIsValid,
          hasError: false,
          type,
        },
      }));
    }
  };

  const handleBlur = (e) => {
    let { type, name, value = "" } = e.target;
    if (type === "text" || type === "password" || type === "select-one") {
      valueIsValid = value.trim() !== "" && validators[name](value);
      hasError = !valueIsValid;
      setState((state) => ({
        ...state,
        [name]: { input: value, ...state[name], isTouched: true, hasError },
      }));
    }
  };

  const reset = () => {
    setState({});
  };

  return [state, handleChange, handleBlur, reset];
};

export default useForm;
