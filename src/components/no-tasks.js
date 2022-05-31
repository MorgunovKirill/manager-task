import AbstractComponent from "./AbstractComponent";

const createNoTasksTemplate = () => {
  return (
    `<section class="board container">
        <p class="board__no-tasks">
          Click «ADD NEW TASK» in menu to create your first task
        </p>
     </section>`
  );
};


export default class NoTasks extends AbstractComponent{

  getTemplate() {
    return createNoTasksTemplate();
  }
}


