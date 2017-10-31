/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import ResultsPage from 'containers/ResultsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Auth from '../../components/Auth/Auth';
import history from '../../components/Auth/history';
import LoginPage from '../../components/Auth/Login';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/results/:surveyName" component={ResultsPage} />
          <Route exact path="/login" component={auth.login} />
          <Route exact path="/callback" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
