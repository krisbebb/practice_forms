import React from "react";
import useForm from "../hooks/use-form";
import Message from "./Message";

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
  return animalCount >= 2;
};

const validateTigerType = (tigerType) => {
  return tigerType !== null;
};

const Form = () => {
  const {
    value: emailInput,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useForm(validateEmail, "input");

  const {
    value: passwordInput,
    isValid: passwordIsValid,
    hasError: passwordInputHasError,
    inputChangeHandler: passwordInputChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPasswordInput,
  } = useForm(validatePassword, "input");

  const {
    value: colourInput,
    isValid: colourIsValid,
    hasError: colourInputHasError,
    inputBlurHandler: colourInputBlurHandler,
    inputChangeHandler: colourInputChangeHandler,
    reset: resetColourInput,
  } = useForm(validateColour, "input");

  const {
    checkboxValues: animalValues,
    isValid: animalsAreValid,
    hasError: animalInputHasError,
    checkboxChangeHandler: animalInputChangeHandler,
    reset: resetAnimalInput,
  } = useForm(validateAnimals, "checkboxes");

  const {
    value: tigerTypeInput,
    isValid: tigerTypeIsValid,
    hasError: tigerTypeInputHasError,
    inputChangeHandler: tigerTypeInputChangeHandler,
    inputBlurHandler: tigerTypeInputBlurHandler,
    reset: resetTigerTypeInput,
  } = useForm(validateTigerType, "input");

  let formIsValid = false;

  if (
    emailIsValid &&
    passwordIsValid &&
    colourIsValid &&
    animalsAreValid &&
    tigerTypeIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      console.log("Your form is valid!");
      alert("Form submitted successfully!");
      resetEmailInput();
      resetPasswordInput();
      resetColourInput();
      resetAnimalInput();
      resetTigerTypeInput();
    }
  };

  const emailInputClasses = emailInputHasError ? "error" : "";
  const passwordInputClasses = passwordInputHasError ? "error" : "";
  const colourInputClasses = colourInputHasError ? "error" : "";
  const tigerTypeInputClasses = tigerTypeInputHasError ? "error" : "";

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
            required
          >
            <option value="">Choose colour</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="black">Black</option>
            <option value="brown">Brown</option>
          </select>
        </p>

        <p>
          <span className="label">Animal</span>

          <input
            type="checkbox"
            name="animal"
            value="bear"
            id="bear"
            checked={animalValues.bear || false}
            onChange={animalInputChangeHandler}
          />
          <label htmlFor="bear">Bear</label>

          <input
            type="checkbox"
            name="animal"
            value="tiger"
            id="tiger"
            checked={animalValues.tiger || false}
            onChange={animalInputChangeHandler}
          />
          <label htmlFor="tiger">Tiger</label>

          <input
            type="checkbox"
            name="animal"
            value="snake"
            id="snake"
            checked={animalValues.snake || false}
            onChange={animalInputChangeHandler}
          />
          <label htmlFor="snake">Snake</label>

          <input
            type="checkbox"
            name="animal"
            value="donkey"
            id="donkey"
            checked={animalValues.donkey || false}
            onChange={animalInputChangeHandler}
          />
          <label htmlFor="donkey">Donkey</label>
        </p>
        <p className={tigerTypeInputClasses}>
          <label className="label" htmlFor="tiger_type">
            Type of tiger
          </label>
          <input
            type="text"
            name="tiger_type"
            id="tiger_type"
            value={tigerTypeInput}
            onChange={tigerTypeInputChangeHandler}
            onBlur={tigerTypeInputBlurHandler}
            disabled={!animalValues.tiger}
          />
        </p>
      </fieldset>
      <fieldset>
        <p>
          <input type="submit" value="Create account" disabled={!formIsValid} />
        </p>
      </fieldset>
      {emailInputHasError && (
        <Message message="Please enter a valid email address" classes="error" />
      )}
      {passwordInputHasError && (
        <Message
          message="Please ensure your password has at least 8 characters."
          classes="error"
        />
      )}
      {colourInputHasError && (
        <Message message="Please choose a colour." classes="error" />
      )}
      {animalInputHasError && (
        <Message message="Please select at least 2 animals." classes="error" />
      )}
      {animalValues.tiger && tigerTypeInputHasError && (
        <Message message="Please choose a tiger type." classes="error" />
      )}
      {formIsValid && (
        <Message message="Click create account to submit." classes="message" />
      )}
    </form>
  );
};

export default Form;
