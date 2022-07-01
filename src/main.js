import {generateFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/tasks";
import {render} from "./utils/render";
import SiteMenu from "./components/menu";
import Filter from "./components/filter";
import BoardController from "./controllers/BoardController";

const TASKS_COUNT = 19;
const filters = generateFilters();
const tasks = generateTasks(TASKS_COUNT);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenu(), `beforeend`);
render(siteMainElement, new Filter(filters), `beforeend`);

new BoardController(siteMainElement, tasks).render();
