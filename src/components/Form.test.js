import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import Form from "./Form";
// import { render } from '@test'

describe("Form component", () => {
  test("renders heading", () => {
    render(<Form />);
    const headingElement = screen.getByText("Fill out this awesome form");
    expect(headingElement).toBeInTheDocument();
  });
  test("test tiger checkbox is not checked", () => {
    render(<Form />);
    const tigerCheckbox = screen.getByLabelText("Tiger");
    expect(tigerCheckbox).not.toBeChecked();
  });
  test("test tiger checkbox is checked", () => {
    render(<Form />);
    const tigerCheckbox = screen.getByLabelText("Tiger");
    userEvent.click(tigerCheckbox);
    expect(tigerCheckbox).toBeChecked();
  });
});
