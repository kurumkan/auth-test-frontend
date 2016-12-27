import React, { Component } from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions';


class Signin extends Component {
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
    this.props.signinUser({email, password});    
  }

  render() {
    var {handleSubmit, fields:{email, password}} = this.props;    
    return (
      <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
        <fieldset className='form-group'>
          <label>Email:</label>
          <input className='form-control' {...email} />
        </fieldset>
        <fieldset className='form-group'>
          <label>Password:</label>
          <input className='form-control' type='password' {...password} />
        </fieldset>
        {this.renderAlert()}
        <button className='btn btn-primary'>Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state){
  return {errorMessage: state.auth.error}
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);