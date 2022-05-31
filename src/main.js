import {generateFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/tasks";
import {renderTask} from "./utils/utils";
import SiteMenu from "./components/menu";
import Filter from "./components/filter";
import Board from "./components/board";
import Sort from "./components/sort";
import LoadMoreButton from "./components/more-button";
import NoTasks from "./components/no-tasks";
import {render} from "./utils/render";

const TASKS_COUNT = 19;
const SHOWING_TASKS_COUNT = 8;

const filters = generateFilters();
const tasks = generateTasks(TASKS_COUNT);
let taskToAdd = tasks;


export const addTasks = (tasksListElement, tasksArray, count) => {
  for (let i = 0; i < count; i++) {
    if (!tasksArray[i]) {
      taskToAdd = [];
      tasksListElement.parentElement.removeChild(tasksListElement.parentElement.querySelector('.load-more'))
      return
    }

    renderTask(tasksListElement, tasksArray[i])
  }

  return taskToAdd = tasksArray.slice(count)
}

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenu(), `beforeend`);

const isAllTasksArchived = tasks.every((task) => task.isArchive);

if (isAllTasksArchived || !tasks.length) {
  render(siteMainElement, new NoTasks(), `beforeend`);
} else {
  render(siteMainElement, new Filter(filters), `beforeend`);
  render(siteMainElement, new Board(), `beforeend`);

  const boardContainerElement = siteMainElement.querySelector(`.board`);

  render(boardContainerElement, new Sort(), `afterbegin`);

  const tasksListElement = boardContainerElement.querySelector(`.board__tasks`);

  addTasks(tasksListElement, taskToAdd.slice(0), SHOWING_TASKS_COUNT);

  render(boardContainerElement, new LoadMoreButton(), `beforeend`);

  boardContainerElement.querySelector('.load-more').addEventListener('click', (evt) => {
    evt.preventDefault();
    addTasks(tasksListElement, taskToAdd, SHOWING_TASKS_COUNT);
  })
}
