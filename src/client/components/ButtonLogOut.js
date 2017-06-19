import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../actions'
import Button from 'grommet/components/Button'
import LogoutIcon from 'grommet/components/icons/base/Logout'
import LoginIcon from 'grommet/components/icons/base/Login'


class ButtonLogOut extends Component {
  render () {
    return (
      this.props.authenticated
        ? (<Button icon={<LogoutIcon />} label='Log Out' onClick={this.props._handleLogOut} />)
        : (<Button icon={<LoginIcon />} label='Log In' href='http://localhost:3000/' />)
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.setAuth.authenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    _handleLogOut: () => {
      dispatch(logoutUser())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonLogOut)
