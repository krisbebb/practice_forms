import React from "react";

export function Animal() {
  return (
    <fieldset>
      <h3>Your animal</h3>
      <p>
        <label class="label" for="colour">
          Colour
        </label>
        <select name="colour" id="colour">
          <option value="">Choose colour</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
          <option value="black">Black</option>
          <option value="brown">Brown</option>
        </select>
      </p>
      <p>
        <span class="label">Animal</span>

        <input type="checkbox" name="animal" value="bear" id="bear" />
        <label for="bear">Bear</label>

        <input type="checkbox" name="animal" value="tiger" id="tiger" />
        <label for="tiger">Tiger</label>

        <input type="checkbox" name="animal" value="snake" id="snake" />
        <label for="snake">Snake</label>

        <input type="checkbox" name="animal" value="donkey" id="donkey" />
        <label for="donkey">Donkey</label>
      </p>
      <p>
        <label class="label" for="tiger_type">
          Type of tiger
        </label>
        <input type="text" name="tiger_type" id="tiger_type" />
      </p>
    </fieldset>
  );
}
