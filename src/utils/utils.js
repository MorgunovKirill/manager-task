import Task from "../components/task";
import TaskForm from "../components/form";

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
}

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild
}

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTask = (tasksListElement, task) => {
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
