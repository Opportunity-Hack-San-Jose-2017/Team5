/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */
/* eslint-disable */


/***
 * TODO: Ignore this file for now i will take care of these changes later
 */
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {Well, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import logo from '../../images/logo.png';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <Well bsSize='large' bsStyle='custom'>
              <div className='Login'>
                <img src={logo} alt='Citizen Schools' width="45%" height="80%" className="login-image"/>
                <form onSubmit={this.handleSubmit}>
                  <FormGroup controlId='email'>
                    <FormControl
                      autoFocus
                      type='email'
                      value={this.state.email}
                      onChange={this.handleChange}
                      placeholder="Email"
                    />
                  </FormGroup>
                  <FormGroup controlId='password'>
                    <FormControl
                      value={this.state.password}
                      onChange={this.handleChange}
                      type='password'
                      placeholder="Password"
                    />
                  </FormGroup>
                  <Button
                    bsStyle='primary'
                    block
                    /*disabled={!this.validateForm()}*/
                    type='submit'
                  >
                    Login
                  </Button>
                </form>
              </div>
            </Well>
          </div>
        </div>
      </div>
    );
  }
}