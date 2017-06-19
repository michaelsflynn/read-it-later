import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser } from '../actions'
import Hero from 'grommet/components/Hero'
import Heading from 'grommet/components/Heading'
import Headline from 'grommet/components/Headline'
import Form from 'grommet/components/Form'
import FormField from 'grommet/components/FormField'
import Button from 'grommet/components/Button'
import LoginIcon from 'grommet/components/icons/base/Login'

class Login extends Component {
  handleFormSubmit (formProps) {
    // console.log('Form Login:', formProps)
    this.props.loginUser(formProps)
  }

  renderAlert () {
    // console.log('Error Alert:', this.props.errorMessage)
    if (this.props.errorMessage) {
      return (
        <Heading tag='h4'>Error! {this.props.errorMessage}</Heading>
      )
    }
  }

  render () {
    console.log('Login Component Rendered')
    const { handleSubmit } = this.props

    return (
      <div>
        <Hero size='small' backgroundImage={'/img/hero.jpg'} >
          <Headline size='large' strong align='start' >ARTICLY NEWS NOW...</Headline>
        </Hero>
        <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <h3>Sign In Now or <Link to='/register'>Click Here to Register</Link></h3>
          <div>{this.renderAlert()}</div>
          <div>
            <FormField label='Email:' >
              <Field name='email' className='grommetux-form-field__contents' component='input' type='text' />
            </FormField>
          </div>
          <div>
            <FormField label='Password:' >
              <Field name='password' className='grommetux-form-field__contents' component='input' type='password' />
            </FormField>
          </div>
          <Button
            type='submit'
            label='Sign In'
            icon={<LoginIcon />}
          />
        </Form>
        <br />
      </div>
    )
  }
}

Login = reduxForm({
  form: 'login'
})(Login)

function mapStateToProps (state) {
  return {
    errorMessage: state.setAuth.error,
    message: state.setAuth.message
  }
}

export default connect(mapStateToProps, { loginUser })(Login)
