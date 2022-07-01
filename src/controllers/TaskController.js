import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import {render} from "../utils/render";
import {replace} from "../utils/replace";


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

    this._taskComponent.setEditButtonClickHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener('keydown', this._onEscKeyDown)
    });
    this._taskEditComponent.setFormSubmitHandler(() => {
      this._replaceEditToTask();
    });

    this._taskComponent.setFavoriteButtonClickHandler(() => {
        this._onDataChange(this, task, Object.assign({}, task, {
          isFavorite: !task.isFavorite,
        }))
    });

    this._taskComponent.setArchiveButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }))
    });

    render(this._container, this._taskComponent, `beforeend`);
  }

  _replaceEditToTask() {
    this._taskEditComponent.reset();

    replace(this._taskComponent, this._taskEditComponent);
  }

  _replaceTaskToEdit() {
    replace(this._taskEditComponent, this._taskComponent);
  }

  _onEscKeyDown (evt) {
    const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener('keydown', this._onEscKeyDown)
    }
  }
}
