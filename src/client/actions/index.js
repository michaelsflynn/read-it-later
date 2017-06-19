import axios from 'axios'
import cookie from 'react-cookies'

const AUTH_URL = 'http://localhost:3000/auth'

/*
* action types
*/

export const SET_CAT_FILTER = 'SET_CAT_FILTER'
export const SET_SRC_FILTER = 'SET_SRC_FILTER'
export const SET_ARTICLES = 'SET_ARTICLES'
export const SET_SAVED_ARTICLES = 'SET_SAVED_ARTICLES'
export const SHOW_ARTICLES = 'SHOW_ARTICLES'
export const AUTH_USER = 'AUTH_USER'
export const UNAUTH_USER = 'UNAUTH_USER'
export const AUTH_ERROR = 'AUTH_ERROR'
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD'
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD'

/*
 * action creators Categories, Sources, Articles
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

export function setSavedArt (array) {
  return {
    type: SET_SAVED_ARTICLES,
    savedArticles: array,
    receivedAt: Date.now()
  }
}

export function showArticles (bool) {
  return { type: SHOW_ARTICLES, showArticles: bool }
}

/*
 * action creators Authentication
 */

export function loginUser ({ email, password }) {
  // console.log('Login Action Args:', email, password)
  return (dispatch) => {
    axios.post(`${AUTH_URL}/login`, {
      email: email, password: password
    })
    .then(response => {
      console.log('Login Fetch Response:', response)
      cookie.save('token', response.data.token, { path: '/' })
      cookie.save('user', response.data.user, { path: '/' })
      dispatch(setCatFilter(response.data.user.category))
      dispatch(setSrcFilter(response.data.user.source))
      dispatch({ type: AUTH_USER, email: response.data.user.email, role: response.data.user.role })
    })
    .catch((error) => {
      console.log('Login Error:', error)
      errorHandler(dispatch, error.response, AUTH_ERROR)
    })
  }
}

export function registerUser ({email, firstName, lastName, password, selCategory = {value: ''}, selSource = {value: ''}, selRole = {value: 'Member'}}) {
  console.log('Register Action Args:', email, firstName, lastName, password, selCategory, selSource, selRole)
  return (dispatch) => {
    axios.post(`${AUTH_URL}/register`, {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      category: selCategory.value,
      source: selSource.value,
      role: selRole.value
    })
    .then(response => {
      console.log('Fetch Register Response:', response)
      cookie.save('token', response.data.token, { path: '/' })
      cookie.save('user', response.data.user, { path: '/' })
      dispatch(setCatFilter(response.data.user.category))
      dispatch(setSrcFilter(response.data.user.source))
      dispatch({ type: AUTH_USER, email: response.data.user.email, role: response.data.user.role })
    })
    .catch((error) => {
      console.log('Register Error:', error)
      errorHandler(dispatch, error.response, AUTH_ERROR)
    })
  }
}

export function logoutUser () {
  return (dispatch) => {
    dispatch({ type: UNAUTH_USER })
    cookie.remove('token', { path: '/' })
    cookie.remove('user', { path: '/' })
  }
}

/*
 * Authentication Error Handling
 */
export function errorHandler (dispatch, error, type) {
  let errorMessage = ''

  if (error.data.error) {
    errorMessage = error.data.error
  } else if (error.data) {
    errorMessage = error.data
  } else {
    errorMessage = error
  }

  if (error.status === 401) {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please try again.'
    })
    logoutUser()
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    })
  }
}
