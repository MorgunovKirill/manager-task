import {generateFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/tasks";
import {render} from "./utils/utils";
import SiteMenu from "./components/menu";
import Filter from "./components/filter";
import Board from "./components/board";
import Sort from "./components/sort";
import TaskForm from "./components/form";
import Task from "./components/task";
import LoadMoreButton from "./components/more-button";
import NoTasks from "./components/no-tasks";

const TASKS_COUNT = 19;
const SHOWING_TASKS_COUNT = 8;

const filters = generateFilters();
const tasks = generateTasks(TASKS_COUNT);
let taskToAdd = tasks;

const renderTask = (tasksListElement, task) => {
  const taskComponent = new Task(task);
  const taskEditComponent = new TaskForm(task);

  const replaceEditToTask = () => {
    tasksListElement.replaceChild(taskComponent.getELement(), taskEditComponent.getELement())
  }

  const replaceTaskToEdit = () => {
    tasksListElement.replaceChild(taskEditComponent.getELement(), taskComponent.getELement())
  }

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener('keydown', onEscKeyDown)
    }
  }

  const editButton = taskComponent.getELement().querySelector('.card__btn--edit');
  editButton.addEventListener('click', () => {
    replaceTaskToEdit()
    document.addEventListener('keydown', onEscKeyDown)
  })

  const editForm = taskEditComponent.getELement().querySelector('form');
  editForm.addEventListener('submit', () => {
    replaceEditToTask()
  })

  render(tasksListElement, taskComponent.getELement(), `beforeend`);
}

export const addTasks = (tasksListElement, tasksArray, count) => {
  for (let i = 0; i < count; i++) {
    if (!tasksArray[i]) {
      taskToAdd = [];
      tasksListElement.parentElement.removeChild( tasksListElement.parentElement.querySelector('.load-more'))
      return
    }

    renderTask(tasksListElement, tasksArray[i])
  }

  return taskToAdd = tasksArray.slice(count)
}

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenu().getElement(), `beforeend`);

const isAllTasksArchived = tasks.every((task) => task.isArchive);

if (isAllTasksArchived || !tasks.length) {
  render(siteMainElement, new NoTasks().getElement(), `beforeend`);
} else {
  render(siteMainElement, new Filter(filters).getELement(), `beforeend`);
  render(siteMainElement, new Board().getElement(), `beforeend`);

  const boardContainerElement = siteMainElement.querySelector(`.board`);

  render(boardContainerElement, new Sort().getElement(), `afterbegin`);

  const tasksListElement = boardContainerElement.querySelector(`.board__tasks`);

  addTasks(tasksListElement, taskToAdd.slice(0), SHOWING_TASKS_COUNT);

  render(boardContainerElement, new LoadMoreButton().getElement(), `beforeend`);

  boardContainerElement.querySelector('.load-more').addEventListener('click', (evt) => {
    evt.preventDefault();
    addTasks(tasksListElement, taskToAdd, SHOWING_TASKS_COUNT);
  })
}
