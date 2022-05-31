import {createElement} from "../utils/utils";
import AbstractComponent from "./AbstractComponent";

const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;

  return (`<input
        type="radio"
        id="filter__${name}"
        class="filter__input visually-hidden"
        name="filter"
        ${isChecked ? 'checked' : ''}
      />
      <label for="filter__${name}" class="filter__label">
        ${name} <span class="filter__${name}-count">${count}</span>
      </label>
  `)
}

const createFiltersTemplate = (filters) => {
  const filtersList = filters.map((it, i) => createFilterMarkup(it, i == 0)).join('\n');

  return (
    `<section class="main__filter filter container">
            ${filtersList}
    </section>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super()

    this._filters = filters;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters)
  }
}
