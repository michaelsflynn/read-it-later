// Reducers for Articles
const initialState = { showArticles: false, articles: [], savedArticles: [] }

const setArticles = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ARTICLES':
      return Object.assign({}, state, {
        articles: action.articles
      })
    case 'SET_SAVED_ARTICLES':
      return Object.assign({}, state, {
        savedArticles: action.savedArticles
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
