import {generateFilters} from "./mock/filter.js";
import {createSiteMenuTemplate} from "./components/menu.js"
import {createFiltersTemplate} from "./components/filter.js"
import {createBoardTemplate} from "./components/board.js"
import {createSortTemplate} from "./components/sort.js"
import {createTaskFormTemplate} from "./components/form.js"
import {createTaskTemplate} from "./components/task.js"
import {createLoadMoreButtonTemplate} from "./components/more-button.js"


const TASKS_COUNT = 5;
const filters = generateFilters();

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
render(boardTasks, createTaskFormTemplate(), `beforeend`);

for (let i = 0; i < TASKS_COUNT; i++) {
  render(boardTasks, createTaskTemplate(), `beforeend`);
}

render(boardTasks, createLoadMoreButtonTemplate(), `beforeend`);
