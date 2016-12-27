import React, { Component } from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions';


class Signup extends Component {
  renderAlert(){
    var {errorMessage} = this.props;
    if(errorMessage){
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {errorMessage}
        </div>
      )
    }
  }

  handleFormSubmit({email, password}){
    this.props.signupUser({email, password});    
  }

  render() {
    var {handleSubmit, fields:{email, password, passwordConfirm}} = this.props;    
    return (
      <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
        <fieldset className='form-group'>
          <label>Email:</label>
          <input className='form-control' {...email} />
          {(email.error&&email.touched)&&<div className='text-danger'>{email.error}</div>}
        </fieldset>
        <fieldset className='form-group'>
          <label>Password:</label>
          <input className='form-control' type='password' {...password} />
          {(password.error&&password.touched)&&<div className='text-danger'>{password.error}</div>}
        </fieldset>
        <fieldset className='form-group'>
          <label>Confirm Password:</label>
          <input className='form-control' type='password' {...passwordConfirm} />
          {(passwordConfirm.error&&passwordConfirm.touched)&&<div className='text-danger'>{passwordConfirm.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button className='btn btn-primary'>Sign up!</button>
      </form>
    );
  }
}

function validate(fromProps){
  var errors = {}; 

  if(!fromProps.email){
    errors.email = 'Please enter an email';
  }

  if(!fromProps.password){
    errors.password = 'Please enter a password';
  }

  if(!fromProps.passwordConfirm){
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if(fromProps.password!==fromProps.passwordConfirm){
    errors.password='Passwords must match!';
  } 

  return errors;
}

function mapStateToProps(state){
  return {errorMessage: state.auth.error}
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate: validate
}, mapStateToProps, actions)(Signup);