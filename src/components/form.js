import {months} from "../utils/months";
import {repeatingDays} from "../utils/days";
import {colors} from "../utils/colors";

const createDayMarkup = (name, taskDays) => {
   if (taskDays) {
     return (`<input
              class="visually-hidden card__repeat-day-input"
              type="checkbox"
              id="repeat-${name}-4"
              name="repeat"
              value="${name}"
              ${taskDays.includes(name) ? 'checked' : ''}
            />
            <label class="card__repeat-day" for="repeat-${name}-4"
              >${name}</label
            >`)
   }

   return  null
}

const createColorMarkup = (color, taskColor) => {
  return (`<input
                  type="radio"
                  id="color-${color}-4"
                  class="card__color-input card__color-input--${color} visually-hidden"
                  name="color"
                  value="${color}"
                    ${color === taskColor ? 'checked' : ''}
                />
                <label
                  for="color-${color}-4"
                  class="card__color card__color--${color}"
                  >${color}</label
                >`)
}

export const createTaskFormTemplate = (task) => {
  const {text, dueDate, taskRepeatingDays, tags, color} = task

  return (
    `<article class="card card--edit card--${color} card--repeat">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${text}</textarea>
            </label>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${dueDate && !taskRepeatingDays ? `yes` : 'no'}</span>
                </button>
                ${!taskRepeatingDays ? `
                <fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder=""
                      name="date"
                      value="${dueDate ? `${dueDate.getDay()} ${months[dueDate.getMonth()]}` : ''}"
                    />
                  </label>
                </fieldset>` : ''
                }
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${taskRepeatingDays ? 'yes' : 'no'}</span>
                </button>
                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                    ${[...repeatingDays].map((el) => {
                      return createDayMarkup(el, taskRepeatingDays)
                    }).join('')}
                  </div>
                </fieldset>
              </div>
            </div>
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                    ${[...colors].map((el) => {
                        return createColorMarkup(el, color)
                    }).join('')}
              </div>
            </div>
          </div>
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};
