import {generateFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/tasks";
import {renderTasks} from "./utils/utils";
import SiteMenu from "./components/menu";
import Filter from "./components/filter";
import Board from "./components/board";
import Sort from "./components/sort";
import LoadMoreButton from "./components/more-button";
import NoTasks from "./components/no-tasks";
import {render} from "./utils/render";
import {remove} from "./utils/remove";

const TASKS_COUNT = 19;
const SHOWING_TASKS_COUNT_BUTTON = 8;
let showingTasksCount = 0;

const filters = generateFilters();
const tasks = generateTasks(TASKS_COUNT);

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

  renderTasks(tasksListElement, tasks.slice(0, SHOWING_TASKS_COUNT_BUTTON));

  render(boardContainerElement, new LoadMoreButton(), `beforeend`);

  boardContainerElement.querySelector('.load-more').addEventListener('click', (evt) => {
    evt.preventDefault();
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BUTTON;
    renderTasks(tasksListElement, tasks.slice(prevTasksCount, showingTasksCount));

    if (showingTasksCount >= tasks.length) {

    }
  })
}
