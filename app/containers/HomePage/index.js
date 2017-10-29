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

import React from 'react';
import SurveyModal from './surveyModal';
import SurveyList from './surveyList';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const Surveys = [{"name": 'Survey 1', id:0, "postedBy": "John Doe", "isResultAvailable": true},
                {"name": 'Survey 2', id:1, "postedBy": "John Doe", "isResultAvailable": true},
                {"name": 'Survey 3', id:2, "postedBy": "John Doe", "isResultAvailable": false},
                {"name": 'Survey 4', id:3, "postedBy": "John Doe", "isResultAvailable": true}
                ];
    return (
      <div>
        <h1>
          <center>Welcome to Citizen School Survey</center>
        </h1>
        <SurveyModal />
        <SurveyList surveys={Surveys} />
      </div>
    );
  }
}
