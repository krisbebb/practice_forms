import { useState, React } from "react";
import useForm from "../hooks/use-form";

const validateEmail = (email) => {
  const mailformat =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return email.match(mailformat);
};

const validatePassword = (password) => {
  return password.length > 8;
};

const validateColour = (colour) => {
  return colour !== null;
};

const validateAnimals = (animals) => {
  let animalCount = 0;
  for (const [key, value] of Object.entries(animals)) {
    if (value === true) {
      animalCount++;
    }
  }
  console.log(animals, animalCount);
  return animalCount >= 2;
};

const Form = () => {
  // const [animalValues, setAnimalValues] = useState({
  //   isBear: false,
  //   isSnake: false,
  //   isTiger: false,
  //   isDonkey: false,
  // });

  const {
    value: emailInput,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useForm(validateEmail, "input");

  const {
    value: passwordInput,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    inputChangeHandler: passwordInputChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPasswordInput,
  } = useForm(validatePassword, "input");

  const {
    value: colourInput,
    isValid: enteredColourIsValid,
    hasError: colourInputHasError,
    inputBlurHandler: colourInputBlurHandler,
    inputChangeHandler: colourInputChangeHandler,
    reset: resetColourInput,
  } = useForm(validateColour, "input");

  const {
    checkboxValues: animalValues,
    isValid: animalsAreValid,
    hasError: animalInputHasError,
    // inputChangeHandler: animalInputChangeHandler,
    inputBlurHandler: animalInputBlurHandler,
    checkboxChangeHandler: animalInputChangeHandler,
    reset: resetAnimalInput,
  } = useForm(validateAnimals, "checkboxes");

  let formIsValid = false;

  if (
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredColourIsValid &&
    animalsAreValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      console.log(emailInput, passwordInput, colourInput);
      console.log("Your form is valid!");
      resetEmailInput();
      resetPasswordInput();
      resetColourInput();
    }
  };

  // const bearInputChangeHandler = (event) => {
  //   setAnimalValues({ ...animalValues, isBear: event.target.checked });
  //   console.log(event.target.value);
  //   console.log(animalValues);
  // };

  const emailInputClasses = emailInputHasError ? "error" : "";
  const passwordInputClasses = passwordInputHasError ? "error" : "";
  const colourInputClasses = colourInputHasError ? "error" : "";

  return (
    <form method="post" action="" onSubmit={formSubmissionHandler}>
      <h1> Fill out this awesome form </h1>
      <fieldset>
        <h3> Your details </h3>
        <p className={emailInputClasses}>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className={emailInputClasses}
            type="text"
            id="email"
            name="email"
            placeholder="user@example.com"
            onChange={emailInputChangeHandler}
            onBlur={emailInputBlurHandler}
            value={emailInput}
          />
        </p>
        {emailInputHasError && (
          <p className="error">
            <label htmlFor="field">Please enter a valid email address.</label>
          </p>
        )}
        <p className={passwordInputClasses}>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="error"
            type="password"
            id="password"
            name="username"
            onChange={passwordInputChangeHandler}
            onBlur={passwordInputBlurHandler}
            value={passwordInput}
          />
        </p>
        {passwordInputHasError && (
          <p className="error">
            <label htmlFor="field">
              Please ensure your password is at least 8 characters.
            </label>
          </p>
        )}
      </fieldset>
      <fieldset>
        <h3>Your animal</h3>
        <p className={colourInputClasses}>
          <label className="label" htmlFor="colour">
            Colour
          </label>
          <select
            name="colour"
            id="colour"
            value={colourInput}
            onChange={colourInputChangeHandler}
            onBlur={colourInputBlurHandler}
          >
            <option value="">Choose colour</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="black">Black</option>
            <option value="brown">Brown</option>
          </select>
        </p>
        {colourInputHasError && (
          <p className="error">
            <label htmlFor="field">Please choose a colour.</label>
          </p>
        )}
        <p>
          <span className="label">Animal</span>

          <input
            type="checkbox"
            name="animal"
            value="bear"
            id="bear"
            checked={animalValues.bear}
            onChange={animalInputChangeHandler}
          />
          <label htmlFor="bear">Bear</label>

          <input
            type="checkbox"
            name="animal"
            value="tiger"
            id="tiger"
            checked={animalValues.tiger}
            onChange={animalInputChangeHandler}
          />
          <label htmlFor="tiger">Tiger</label>

          <input
            type="checkbox"
            name="animal"
            value="snake"
            id="snake"
            checked={animalValues.snake}
            onChange={animalInputChangeHandler}
          />
          <label htmlFor="snake">Snake</label>

          <input
            type="checkbox"
            name="animal"
            value="donkey"
            id="donkey"
            checked={animalValues.donkey}
            onChange={animalInputChangeHandler}
          />
          <label htmlFor="donkey">Donkey</label>
        </p>
        <p>
          <label className="label" htmlFor="tiger_type">
            Type of tiger
          </label>
          <input type="text" name="tiger_type" id="tiger_type" />
        </p>
      </fieldset>
      <fieldset>
        <p>
          <input type="submit" value="Create account" disabled={!formIsValid} />
        </p>
      </fieldset>
    </form>
  );
};

export default Form;
