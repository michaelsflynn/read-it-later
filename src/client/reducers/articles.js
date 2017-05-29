// Reducers for Articles
const initialState = { showArticles: false, articles: [] }

const setArticles = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ARTICLES':
      return Object.assign({}, state, {
        articles: action.articles
      })
    case 'SHOW_ARTICLES':
      return Object.assign({}, state, {
        showArticles: action.showArticles
      })
    default:
      return state
  }
}

export default setArticles
