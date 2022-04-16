import React from "react";
import useForm from "../hooks/useForm";
import Message from "./Message";

const validators = {
  email: (email) => {
    const mailformat =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(mailformat);
  },
  password: (password) => {
    return password.length > 8;
  },
  colour: (colour) => {
    return colour !== null;
  },
  animal: (animals) => {
    let animalCount = 0;
    for (const [key, value] of Object.entries(animals)) {
      if (value === true) {
        animalCount++;
      }
    }
    return animalCount >= 2;
  },
  tigerType: (tigerType) => {
    return tigerType !== null;
  },
};

const Form = () => {
  const [values, handleChange, handleBlur, reset] = useForm(validators);
  const tigerSelected = values.animal ? values.animal.checked.tiger : false;
  let animals = { bear: false, tiger: false, snake: false, donkey: false };

  if (values.animal) {
    animals = { ...animals, ...values.animal.checked };
  }

  const errors = {
    email: values.email ? values.email.hasError : false,
    password: values.password ? values.password.hasError : false,
    colour: values.colour ? values.colour.hasError : false,
    animal: values.animal ? !validators.animal(values.animal.checked) : false,
    tigerType: values.tigerType
      ? tigerSelected && values.tigerType.hasError
      : false,
    noAnimals: !values.animal,
  };

  // console.log(values.animal ? values.animal.checked : "no animals yet");
  let formIsValid = false;

  if (
    !errors.email &&
    !errors.password &&
    !errors.colour &&
    !errors.animal &&
    !errors.tigerType &&
    !errors.noAnimals
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      console.log("Your form is valid!");
      alert("Form submitted successfully!");
      reset();
    }
  };

  const emailInputClasses = errors.email ? "error" : "";
  const passwordInputClasses = errors.password ? "error" : "";
  const colourInputClasses = errors.colour ? "error" : "";
  const tigerTypeInputClasses = errors.tigerType ? "error" : "";

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
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email ? values.email.input : ""}
            required
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
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password ? values.password.input : ""}
            required
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
            value={values.colour ? values.colour.input : ""}
            onChange={handleChange}
            onBlur={handleBlur}
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
            // checked={animals.bear || false}
            checked={animals.bear}
            onChange={handleChange}
          />
          <label htmlFor="bear">Bear</label>

          <input
            type="checkbox"
            name="animal"
            value="tiger"
            id="tiger"
            checked={animals.tiger}
            onChange={handleChange}
          />
          <label htmlFor="tiger">Tiger</label>

          <input
            type="checkbox"
            name="animal"
            value="snake"
            id="snake"
            checked={animals.snake}
            onChange={handleChange}
          />
          <label htmlFor="snake">Snake</label>

          <input
            type="checkbox"
            name="animal"
            value="donkey"
            id="donkey"
            checked={animals.donkey}
            onChange={handleChange}
          />
          <label htmlFor="donkey">Donkey</label>
        </p>
        <p className={tigerTypeInputClasses}>
          <label className="label" htmlFor="tigerType">
            Type of tiger
          </label>
          <input
            type="text"
            name="tigerType"
            id="tigerType"
            value={values.tigerType ? values.tigerType.input : ""}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!tigerSelected}
            required={tigerSelected}
          />
        </p>
      </fieldset>
      <fieldset>
        <p>
          <input type="submit" value="Create account" disabled={!formIsValid} />
        </p>
      </fieldset>
      {errors.email && (
        <Message message="Please enter a valid email address" classes="error" />
      )}
      {errors.password && (
        <Message
          message="Please ensure your password has more than 8 characters."
          classes="error"
        />
      )}
      {errors.colour && (
        <Message message="Please choose a colour." classes="error" />
      )}
      {errors.animal && (
        <Message message="Please select at least 2 animals." classes="error" />
      )}
      {tigerSelected && errors.tigerType && (
        <Message message="Please choose a tiger type." classes="error" />
      )}
      {formIsValid && (
        <Message message="Click create account to submit." classes="message" />
      )}
    </form>
  );
};

export default Form;
