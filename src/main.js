import {generateFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/tasks";

import {createSiteMenuTemplate} from "./components/menu.js"
import {createFiltersTemplate} from "./components/filter.js"
import {createBoardTemplate} from "./components/board.js"
import {createSortTemplate} from "./components/sort.js"
import {createTaskFormTemplate} from "./components/form.js"
import {createTaskTemplate} from "./components/task.js"
import {createLoadMoreButtonTemplate} from "./components/more-button.js"


const TASKS_COUNT = 10;
const filters = generateFilters();
const tasks = generateTasks(TASKS_COUNT);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);

render(siteMainElement, createFiltersTemplate(filters), `beforeend`);

render(siteMainElement, createBoardTemplate(), `beforeend`);
const borderContainerElement = siteMainElement.querySelector(`.board`);
render(borderContainerElement, createSortTemplate(), `afterbegin`);

const boardTasks = borderContainerElement.querySelector(`.board__tasks`);
render(boardTasks, createTaskFormTemplate(tasks[0]), `beforeend`);

tasks.slice(1).map((el) =>  render(boardTasks, createTaskTemplate(el), `beforeend`));


render(boardTasks, createLoadMoreButtonTemplate(), `beforeend`);
