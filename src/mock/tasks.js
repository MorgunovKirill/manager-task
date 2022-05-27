import {repeatingDays} from "../utils/days";
import {colors} from "../utils/colors";
import {tags} from "../utils/tags";

const tasksTypes = ['Сделать домашку', 'Защитить на 100', 'Отдохнуть'];
const dueDate = [new Date('10/11/2021'), new Date('05/12/2021'), null];


const generateTasks = (count = 1) => {
    const result = [];

    for (let i = 0; i < count; i++) {
      result.push(
        {
          text: tasksTypes[Math.floor(Math.random() * tasksTypes.length)],
          dueDate: dueDate[Math.floor(Math.random() * dueDate.length)],
          taskRepeatingDays: Math.round(Math.random()) ? repeatingDays[Math.floor(Math.random() * repeatingDays.length)] : null,
          tags: tags[Math.floor(Math.random() * tags.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          isArchive: !!Math.round(Math.random())
        }
      )
    }

  return result
}

export { generateTasks }
