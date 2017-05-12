// Reducers for Articles
const initialState = { articles: [] }

const setArticles = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ARTICLES':
      return Object.assign({}, state, {
        articles: action.articles
      })
    default:
      return state
  }
}

export default setArticles
