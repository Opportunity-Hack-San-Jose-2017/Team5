import React from 'react';
import logo from '../../images/logo.png';

const NavBar = () => {

  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/home"><img src={logo} alt="Citizen Schools" width="110px" height="35px" /></a>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a href="/home" className="dropdown-toggle" data-toggle="dropdown">
                <span className="glyphicon glyphicon-user"></span>
                <strong>Login</strong>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;