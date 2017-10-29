/* eslint-disable */
import React from 'react';
import { browserHistory } from 'react-router';

const SurveyListItem = ({survey}) => {

    const surveyTitle = survey.title;
    const surveyPostedOn = survey.postedOn;
    const surveyPostedBy = survey.postedBy;

    return (
        <div className="media">
            <div className="media-body">
              <div className="col-md-9">
                  <h2>{surveyTitle}</h2>
                  <ul className="list-inline list-unstyled">
                      <li>
                          <span><i className="glyphicon glyphicon-calendar"></i> {surveyPostedOn}</span>
                      </li>
                      <li>|</li>
                      <li>Posted By: {surveyPostedBy}</li>
                  </ul>
              </div>
              <div className="col-md-2">
                  <button className="btn btn-default survey-btn" >View Results</button>
              </div>
              <div className="col-md-1">
                 <button className="btn btn-warning survey-btn">Remove</button>
              </div>
            </div>
        </div>
    );
};

export default SurveyListItem;