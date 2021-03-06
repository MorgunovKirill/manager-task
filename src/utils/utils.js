import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import {render} from "./render";

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
}

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild
}

// export const renderTasks = (tasksListElement, tasks) => {
//
//   tasks.forEach((task) => {
//     const taskComponent = new Task(task);
//     const taskEditComponent = new TaskEdit(task);
//
//     const replaceEditToTask = () => {
//       tasksListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement())
//     }
//
//     const replaceTaskToEdit = () => {
//       tasksListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement())
//     }
//
//     const onEscKeyDown = (evt) => {
//       const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';
//
//       if (isEscKey) {
//         replaceEditToTask();
//         document.removeEventListener('keydown', onEscKeyDown)
//       }
//     }
//
//     const editButton = taskComponent.getElement().querySelector('.card__btn--edit');
//     editButton.addEventListener('click', () => {
//       replaceTaskToEdit()
//       document.addEventListener('keydown', onEscKeyDown)
//     })
//
//     const editForm = taskEditComponent.getElement().querySelector('form');
//     editForm.addEventListener('submit', () => {
//       replaceEditToTask()
//     })
//
//     render(tasksListElement, taskComponent, `beforeend`);
//   })
// }
