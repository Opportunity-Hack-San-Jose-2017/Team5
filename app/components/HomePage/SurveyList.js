
/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const SurveyList = (props) => {
    const SurveyItems = props.surveys.map((survey) => {
        return (
            <div className="media" key={survey.key}>
                <div className="media-body">
                    <div className="col-md-9">
                        <h2>{survey.title}</h2>
                        <ul className="list-inline list-unstyled">
                            <li>
                                <span><i className="glyphicon glyphicon-calendar"></i> {survey.postedOn}</span>
                            </li>
                            <li>|</li>
                            <li>Posted By: {survey.postedBy}</li>
                        </ul>
                    </div>
                    <div className="col-md-2">
                        <Link to={"/results/" + survey.key} className="btn btn-default survey-btn">View Results</Link>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-warning survey-btn">Remove</button>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="col-md-12">
            {SurveyItems}
        </div>
    );
}

SurveyList.propTypes = {
  surveys: PropTypes.array.isRequired
}

export default SurveyList;