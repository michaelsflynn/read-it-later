import { AUTH_USER,
         UNAUTH_USER,
         AUTH_ERROR } from '../actions'

const initialState = { error: '', message: '', content: '', authenticated: false, email: '', role: '' }

const setAuth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return Object.assign({}, state, { error: '', message: '', authenticated: true, email: action.email, role: action.role })
    case UNAUTH_USER:
      return Object.assign({}, state, { authenticated: false, email: '', role: '' })
    case AUTH_ERROR:
      return Object.assign({}, state, { error: action.payload })
  }
  return state
}

export default setAuth
