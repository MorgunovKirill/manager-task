const createFilterMarkup = (filter) => {
  const {name, count} = filter;

  return (`<input
        type="radio"
        id="filter__${name}"
        class="filter__input visually-hidden"
        name="filter"
        checked
      />
      <label for="filter__${name}" class="filter__label">
        ${name} <span class="filter__${name}-count">${count}</span>
      </label>
  `)
}

export const createFiltersTemplate = (filters) => {
  const filtersList = filters.map((it) => createFilterMarkup(it)).join('\n');

  return (
    `<section class="main__filter filter container">
            ${filtersList}
    </section>`
  );
};
