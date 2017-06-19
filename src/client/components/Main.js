// Component - Main App
// Library Dependencies
import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import App from 'grommet/components/App'
// Custom Dependencies
import Admin from './Admin'
import Member from './Member'
import NotFoundPage from './NotFoundPage'
import Login from '../containers/Login'
import Register from '../containers/Register'

// ***************************************************
// Setup Wrappers for public vs. private Routes
// ***************************************************
const PrivateRoute = ({component: Component, authenticated, ...rest}) => {
  console.log('PrivateRoute Props:', authenticated, ...rest)
  return (
    <Route {...rest} render={props => (
      authenticated === true
       ? (<Component {...props} />)
       : (<Redirect to={{
         pathname: '/',
         state: { from: props.location }
       }} />
      )
    )} />
  )
}

const PublicRoute = ({component: Component, authenticated, ...rest}) => {
  console.log('PublicRoute Props:', authenticated, ...rest)
  return (
    <Route {...rest} render={props => (
      authenticated === false
       ? (<Component {...props} />)
       : (<Member />
      )
    )} />
  )
}

// **********************************************************
// Main class establishes routes
// **********************************************************
class Main extends React.Component {
  render () {
    console.log('Main Component Rendered')
    return (
      <App>
        <Switch>
          <PublicRoute exact path='/' component={Login} authenticated={this.props.authenticated} />
          <PublicRoute path='/register' component={Register} authenticated={this.props.authenticated} />
          <PrivateRoute path='/member' component={Member} authenticated={this.props.authenticated} />
          <PrivateRoute path='/admin' component={Admin} authenticated={this.props.authenticated} />
          <Route component={NotFoundPage} />
        </Switch>
      </App>
    )
  }
}

function mapStateToProps (state) {
  return {
    authenticated: state.setAuth.authenticated,
    catFilter: state.setCategory.catFilter,
    srcFilter: state.setSources.srcFilter
  }
}

export default withRouter(connect(mapStateToProps)(Main))
