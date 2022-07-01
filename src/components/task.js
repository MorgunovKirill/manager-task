import {months} from "../utils/months";
import AbstractComponent from "./AbstractComponent";
import AbstractSmartComponent from "./AbstractSmartComponent";

const createTaskTemplate = (task) => {
  const {text, dueDate, repeatingDays, tags, color} = task


  return (
    `<article class="card card--${color}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites"
            >
              favorites
            </button>
          </div>
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <p class="card__text">${text}</p>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${dueDate ? `${dueDate.getDay()} ${months[dueDate.getMonth()]}` : ''}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export default class Task extends AbstractSmartComponent {
  constructor(task) {
    super();

    this._task = task;
  }

  getTemplate() {
    return createTaskTemplate(this._task)
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector('.card__btn--edit').addEventListener('click', handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector('.card__btn--favorites').addEventListener('click', handler);
  }

  setArchiveButtonClickHandler(handler) {
    this.getElement().querySelector('.card__btn--archive').addEventListener('click', handler);
  }
}
