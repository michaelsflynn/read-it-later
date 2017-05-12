/*
* action types
*/

export const SET_CAT_FILTER = 'SET_CAT_FILTER'
export const SET_SRC_FILTER = 'SET_SRC_FILTER'
export const SET_ARTICLES = 'SET_ARTICLES'

/*
 * action creators
 */

export function setCatFilter (category) {
  return { type: SET_CAT_FILTER, catFilter: category }
}

export function setSrcFilter (source) {
  return { type: SET_SRC_FILTER, srcFilter: source }
}

export function setArt (source, json) {
  return {
    type: SET_ARTICLES,
    source: source,
    articles: json.articles,
    receivedAt: Date.now()
  }
}
