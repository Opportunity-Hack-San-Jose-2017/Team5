/**
 * Created by rdabbir on 10/31/17.
 */

import React, { Component } from 'react';

class Login extends Component {
    goTo(route) {
        this.props.history.replace(`/${route}`)
    }

    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logout();
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        console.log(isAuthenticated);

        return (
            this.login.bind(this)
        );
    }
}

export default Login;