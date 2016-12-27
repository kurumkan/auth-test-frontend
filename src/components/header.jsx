import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Header extends Component {

  renderLinks(){
    var {authenticated} = this.props;
    if(authenticated){
      return (
        <li className='nav-item' key={1}>
          <Link to='/signout' className='nav-link'>Sign Out</Link>
        </li>
      )
    }else{
      return [
        <li className='nav-item' key={1}>
          <Link to='/signin' className='nav-link'>Sign In</Link>
        </li>,
        <li className='nav-item' key={2}>
          <Link to='/signup' className='nav-link'>Sign Up</Link>
        </li>
      ];
        
      
    }
    
  }

  render() {
    return (
      <nav className='navbar navbar-light'>
        <Link to='/' className='navbar-brand'>Redux Auth App</Link>
      	<ul className='nav navbar-nav'>
          {this.renderLinks()}   		
      	</ul>
      </nav>
    );
  }
}

function mapStateToProps(state){
  return { authenticated: state.auth.authenticated}
}

export default connect(mapStateToProps, null)(Header);



