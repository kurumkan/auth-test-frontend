import axios from 'axios';
import {browserHistory} from 'react-router';
const API_URL = 'http://localhost:5000';


export function signinUser({email, password}){
	//by using redux-thunk we have direct access to dispatch method
	//also action creator now returns a function, no an object
	//this function will immediately be called by redux thunk with dispatch method
	
	return function(dispatch){		
		axios.post(API_URL+'/signin', {email, password})
			.then((response)=>{				
				//-update state to indicate user is authenticated
				dispatch({type: 'AUTH_USER'});
				//-save jwt token
				localStorage.setItem('token', response.data.token);
				//-redirect to the secret page
				browserHistory.push('/secret');
			})
			.catch(()=>{
				//- show error message
				dispatch(authError('Bad Login Info'));
			});
	}	
}

export function signupUser({email, password}){
	//by using redux-thunk we have direct access to dispatch method
	//also action creator now returns a function, no an object
	//this function will immediately be called by redux thunk with dispatch method
	
	return function(dispatch){		
		axios.post(API_URL+'/signup', {email, password})
			.then((response)=>{				
				//-update state to indicate user is authenticated
				dispatch({type: 'AUTH_USER'});
				//-save jwt token
				localStorage.setItem('token', response.data.token);
				//-redirect to the secret page
				browserHistory.push('/secret');
			})
			.catch(()=>{
				//- show error message
				dispatch(authError('This email is already in use'));
			});
	}	
}

export function authError(error){
	return {
		type: 'AUTH_ERROR',
		payload: error
	}
}

export function signoutUser(){
	localStorage.removeItem('token');
	return {
		type: 'UNAUTH_USER'
	}
}

export function fetchSecretMessage(){
	return function(dispatch){
		axios.get(API_URL, {
			headers: {authorization: localStorage.getItem('token')}
		})
			.then(response=>{
				dispatch({
					type: 'FETCH_SECRET_MESSAGE',
					payload: response.data.message
				})
			})
			.catch(error=>{console.log(error)})
	}
}