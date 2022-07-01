import {months} from "../utils/months";
import {colors} from "../utils/colors";
import AbstractSmartComponent from "./AbstractSmartComponent";

const createDayMarkup = (day, repeat) => {

     return (`<input
              class="visually-hidden card__repeat-day-input"
              type="checkbox"
              id="repeat-${day}-4"
              name="repeat"
              value="${day}"
              ${repeat ? 'checked' : ''}
            />
            <label class="card__repeat-day" for="repeat-${day}-4"
              >${day}</label
            >`)
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

const createTaskFormTemplate = (task, options) => {
  const {text, dueDate, taskRepeatingDays, tags, color} = task
  const {isDateShowing, isRepeatingTask} = options

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
                  date: <span class="card__date-status">${isDateShowing ? `yes` : 'no'}</span>
                </button>
                ${isDateShowing ? `
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
                  repeat:<span class="card__repeat-status">${isRepeatingTask ? 'yes' : 'no'}</span>
                </button>
                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                    ${Object.entries(taskRepeatingDays).map(([day, repeat]) => {
                      return createDayMarkup(day, repeat)
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

export default class TaskEdit extends AbstractSmartComponent {
  constructor(task) {
    super();
    this._task = task;
    this._isDateShowing = !!task.dueDate;
    this._isRepeatingTask = Object.values(task.taskRepeatingDays).some((el) => !!el);
    this._activeRepeatingDays = null;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createTaskFormTemplate(this._task, {isDateShowing: this._isDateShowing, isRepeatingTask: this._isRepeatingTask});
  }

  setFormSubmitHandler(handler) {
    this.getElement().querySelector('form').addEventListener('submit', handler);
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector('.card__date-deadline-toggle').addEventListener('click', () => {
      this._isDateShowing = !this._isDateShowing;
      this.rerender();
    })

    element.querySelector('.card__repeat-toggle').addEventListener('click', () => {
      this._isRepeatingTask = !this._isRepeatingTask;
      this.rerender();
    })

    const repeatDays = element.querySelector('.card__repeat-days');
    if (repeatDays) {
      repeatDays.addEventListener('change', (evt) => {
        this._activeRepeatingDays[evt.target.value] = evt.target.checked;

        this.rerender();
      })
    }
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  reset() {
    const task = this._task;

    this._isDateShowing = !!task.dueDate;

    this.rerender();
  }
}
