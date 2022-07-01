import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import {render} from "../utils/render";


export default class TaskController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this)
  }

  render(task) {
    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new Task(task);
    this._taskEditComponent = new TaskEdit(task);

    render(this._container, this._taskComponent, `beforeend`);

    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener('keydown', this._onEscKeyDown)
    });
    this._taskEditComponent.setFormSubmitHandler(() => {
      this._replaceEditToTask();
    });
  }

  _replaceEditToTask() {
    this._container.replaceChild(this._taskComponent.getElement(), this._taskEditComponent.getElement())
  }

  _replaceTaskToEdit() {
    this._container.replaceChild(this._taskEditComponent.getElement(), this._taskComponent.getElement())
  }

  _onEscKeyDown (evt) {
    const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener('keydown', this._onEscKeyDown)
    }
  }
}
