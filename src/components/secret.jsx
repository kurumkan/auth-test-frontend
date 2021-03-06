import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Secret extends Component {  
  componentWillMount() {
    this.props.fetchSecretMessage();  
  }

  render() {
    
    return (
      <div>
        {this.props.message}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    message: state.auth.message
  }
}

export default connect(mapStateToProps, actions)(Secret);