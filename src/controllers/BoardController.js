import NoTasks from "../components/no-tasks";
import Sort from "../components/sort";
import LoadMoreButton from "../components/more-button";
import {render} from "../utils/render";
import {remove} from "../utils/remove";
import Board from "../components/board";
import TaskController from "./TaskController";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTasks = (tasksListElement, tasks, onDataChange) => {
  return tasks.map((task) => {

    const taskController = new TaskController(tasksListElement, onDataChange);

    taskController.render(task);

    return taskController
  })
}

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;

    this._boardComponent = new Board();
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._noTasksComponent = new NoTasks();
    this._sortComponent = new Sort();
    this._loadMoreButtonComponent = new LoadMoreButton();
    this._onDataChange = this._onDataChange.bind(this)
  }

  render() {
    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);

    if (isAllTasksArchived || !this._tasks.length) {
      render(this._container, this._noTasksComponent, `beforeend`);
    } else {
      render(this._container, this._boardComponent, `beforeend`);

      render(this._boardComponent.getElement(), this._sortComponent, `afterbegin`);

      const tasksListElement = this._boardComponent.getElement().querySelector(`.board__tasks`);

      renderTasks(tasksListElement, this._tasks.slice(0, SHOWING_TASKS_COUNT_BY_BUTTON), this._onDataChange);

      this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick.bind(this, tasksListElement))

      render(this._boardComponent.getElement(), this._loadMoreButtonComponent, `beforeend`);
    }
  }

  _onLoadMoreButtonClick(container) {
    const prevTasksCount = this._showingTasksCount;
    this._showingTasksCount = this._showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;
    renderTasks(container, this._tasks.slice(prevTasksCount, this._showingTasksCount), this._onDataChange);

    if (this._showingTasksCount >= this._tasks.length) {
      remove(this._loadMoreButtonComponent)
    }
  }

  _onDataChange (container, oldData, newData) {
      console.log(container)
      console.log('oldData', oldData)
      console.log('newData', newData)
  }
}
