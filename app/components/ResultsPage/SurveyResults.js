
/* eslint-disable */
import React from 'react';

const SurveyGraphs = (props) => {

   




    return (
        <div className="col-md-12">
            { props.surveys.length == 0 ? <div className="media">
                <div className="media-body">
                    <div className="col-lg-12">
                        <h1>No Results Found for this Survey</h1>
                    </div>
                </div>
            </div> : SurveyGraphs }
        </div>
    );
};

export default SurveyGraphs;