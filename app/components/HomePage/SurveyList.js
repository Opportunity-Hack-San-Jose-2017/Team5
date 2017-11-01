
/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const SurveyList = (props) => {
    function handleSwitch(e) {
        e.preventDefault();
        console.log('The link was clicked.');
    }

    const SurveyItems = props.surveys.map((survey) => {
        return (
            <div className="media well" key={survey._id}>
                <div className="media-body">
                    <div className="col-md-1">
                        <label className="switch" title="Enable Quiz">
                            <input type="checkbox" defaultChecked={survey.isSurveyEnabled} onChange={handleSwitch} />
                            <div className="slider round"></div>
                        </label>
                    </div>
                    <div className="col-md-6">
                        <h3 style={{marginTop: '10px'}}>{survey.surveyTitle}</h3>
                        <ul className="list-inline list-unstyled">
                            <li>
                                <span><i className="glyphicon glyphicon-calendar"></i> {survey.postedOn}</span>
                            </li>
                            <li>|</li>
                            <li><span><i className="glyphicon glyphicon-user"></i></span>   {survey.postedBy} </li>
                            <li>|</li>
                            <li><span><i className="glyphicon glyphicon-barcode"></i></span><b style={{cursor: 'pointer'}}>    {survey._id}</b></li>
                        </ul>
                    </div>
                    <div className="col-md-5">
                        <button className="btn btn-warning survey-btn btn-sm">Remove</button>
                        {
                            survey.hasResults ? null : <button  className="btn btn-success  survey-btn btn-sm">Download Results</button>
                        }
                        <Link to={"/results/" + survey._id} className="btn btn-default btn-sm survey-btn">View Results</Link>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="col-md-12">
            {props.surveys.length == 0 ? <div className="media">
                <div className="media-body">
                    <div className="col-lg-12">
                        <h1>No survey result found</h1>
                    </div>
                </div>
            </div> : SurveyItems}
        </div>
    );
}

SurveyList.propTypes = {
    surveys: PropTypes.array.isRequired
}

export default SurveyList;