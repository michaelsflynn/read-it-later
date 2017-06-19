import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { registerUser } from '../actions'
import Form from 'grommet/components/Form'
import FormField from 'grommet/components/FormField'
import Heading from 'grommet/components/Heading'
import Button from 'grommet/components/Button'
import LoginIcon from 'grommet/components/icons/base/Login'
import Head from '../components/Head'
import Foot from '../components/Foot'
import SelectCategory from '../components/SelectCategory'
import SelectSource from '../components/SelectSource'
import SelectRole from '../components/SelectRole'

class Register extends Component {
  handleFormSubmit (formProps) {
    // console.log('Register formProps', formProps)
    this.props.registerUser(formProps)
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div>
          <Heading tag='h4'>Error! {this.props.errorMessage}</Heading>
        </div>
      )
    }
  }

  render () {
    console.log('Register Component Rendered')
    const { handleSubmit } = this.props

    return (
      <div>
        <Head />
        <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Heading>Sign Up Now!</Heading>
          <div>{this.renderAlert()}</div>
          <div>
            <FormField label='First Name:'>
              <Field name='firstName' className='grommetux-form-field__contents' component='input' type='text' />
            </FormField>
          </div>
          <div>
            <FormField label='Last Name:' >
              <Field name='lastName' className='grommetux-form-field__contents' component='input' type='text' />
            </FormField>
          </div>
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
          <div>
            <FormField label='Preferred Category:' >
              <Field name='selCategory'component={SelectCategory} />
            </FormField>
          </div>
          <div>
            <FormField label='Preferred Source:' >
              <Field name='selSource' component={SelectSource} />
            </FormField>
          </div>
          <div>
            <FormField label='User Role:' >
              <Field name='selRole' component={SelectRole} />
            </FormField>
          </div>
          <Button
            type='submit'
            label='Register'
            icon={<LoginIcon />}
          />
        </Form>
        <Foot />
      </div>
    )
  }
}

Register = reduxForm({
  form: 'register'
})(Register)

function mapStateToProps (state) {
  return {
    errorMessage: state.setAuth.error,
    message: state.setAuth.message,
    categories: state.setCategory.categories,
    sources: state.setSources.sources
  }
}

export default connect(mapStateToProps, { registerUser })(Register)
