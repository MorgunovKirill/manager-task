import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import {render} from "../utils/render";
import {replace} from "../utils/replace";

const Mode = {
  DEFAULT: 'default',
  EDIT: 'edit'
}

export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

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

    if (oldTaskComponent && oldTaskEditComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._taskComponent, oldTaskEditComponent);
    } else {
      render(this._container, this._taskComponent, `beforeend`);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTask();
    }
  }

  _replaceEditToTask() {
    this._taskEditComponent.reset();

    replace(this._taskComponent, this._taskEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _replaceTaskToEdit() {
    this._onViewChange();
    replace(this._taskEditComponent, this._taskComponent);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown (evt) {
    const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

    if (isEscKey) {
      this._replaceEditToTask();
      document.removeEventListener('keydown', this._onEscKeyDown)
    }
  }
}
