import {generateFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/tasks";

import {createSiteMenuTemplate} from "./components/menu.js"
import {createFiltersTemplate} from "./components/filter.js"
import {createBoardTemplate} from "./components/board.js"
import {createSortTemplate} from "./components/sort.js"
import {createTaskFormTemplate} from "./components/form.js"
import {createTaskTemplate} from "./components/task.js"
import {createLoadMoreButtonTemplate} from "./components/more-button.js"


const TASKS_COUNT = 19;
const filters = generateFilters();
const tasks = generateTasks(TASKS_COUNT);
let taskToAdd = tasks;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const addTasks = (tasksArray, count) => {
  for (let i = 0; i < count; i++) {
    if (!tasksArray[i]) {
      taskToAdd = [];
      borderContainerElement.removeChild(borderContainerElement.querySelector('.load-more'))
      return
    }
    render(boardTasks, createTaskTemplate(tasksArray[i]), `beforeend`);
  }

  return taskToAdd = tasksArray.slice(count)
}

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);

render(siteMainElement, createFiltersTemplate(filters), `beforeend`);

render(siteMainElement, createBoardTemplate(), `beforeend`);
const borderContainerElement = siteMainElement.querySelector(`.board`);
render(borderContainerElement, createSortTemplate(), `afterbegin`);

const boardTasks = borderContainerElement.querySelector(`.board__tasks`);
render(boardTasks, createTaskFormTemplate(tasks[0]), `beforeend`);

// tasks.slice(1, 7).map((el) =>  render(boardTasks, createTaskTemplate(el), `beforeend`));

addTasks(taskToAdd.slice(1), 8);

render(borderContainerElement, createLoadMoreButtonTemplate(), `beforeend`);

borderContainerElement.querySelector('.load-more').addEventListener('click', (evt) => {
  evt.preventDefault();
  addTasks(taskToAdd, 8);
})
