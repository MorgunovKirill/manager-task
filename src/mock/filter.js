const filterTypes = ['all', 'overdue', 'today', 'favorites', 'repeating', 'archive'];

const generateFilters = () => {
    return filterTypes.map((it) => {
        return {
          name: it,
          count: Math.floor(Math.random() * 10)
        }
    })
}

export { generateFilters }
