const tasksTypes = ['Сделать домашку', 'Защитить на 100', 'Отдохнуть'];
const dueDate = [new Date('10/11/2021'), new Date('05/12/2021'), null];
const repeatingDays = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];
const tags = ['homework', 'theory', 'practice', 'intensive', 'keks'];
const color = ['black', 'yellow', 'blue', 'green', 'pink'];


const generateTasks = (count = 1) => {
    const result = [];

    for (let i = 0; i < count; i++) {
      result.push(
        {
          text: tasksTypes[Math.floor(Math.random() * tasksTypes.length)],
          dueDate: dueDate[Math.floor(Math.random() * dueDate.length)],
          repeatingDays: repeatingDays[Math.floor(Math.random() * repeatingDays.length)],
          tags: tags[Math.floor(Math.random() * tags.length)],
          color: color[Math.floor(Math.random() * color.length)],
        }
      )
    }

  return result
}

export { generateTasks }
