
/* eslint-disable */
import React from 'react';
import Graphs from './Graphs';

const SurveyResults = (props) => {

    const surveyQuestions = Object.keys(props.surveyResults).map((key) => {

        let result = props.surveyResults[key];
        return (
            <div className="panel-group" id="accordion" key={key}>
                <div className="panel panel-default" id="panel1">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <a data-toggle="collapse" data-target={"#collapse"+ key}
                               href="#collapse">
                                {key + '. '}
                                 {result.question}
                            </a>
                        </h4>
                    </div>
                    <div id={"collapse"+ key} className={ key === '1' ? "panel-collapse collapse in" : "panel-collapse collapse" }>
                        <div className="panel-body">
                            <div className="container">
                               <Graphs question = {result} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="container">
            <div className="col-md-12">
                { props.surveyResults.length == 0 ? <div className="media">
                    <div className="media-body">
                            <h1>No Results Found for this Survey</h1>
                    </div>
                </div> : surveyQuestions }
            </div>
        </div>
    );
};

export default SurveyResults;