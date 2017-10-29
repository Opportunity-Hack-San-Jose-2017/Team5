/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

export default function surveyList(props) {
  const listItems = props.surveys.map((survey) =>
      <tr key={survey.id}>
          <th scope="col">{survey.id}</th>
          <th scope="col">{survey.isResultAvailable ? <a href="">{survey.name}</a> : <p>{survey.name}</p> }</th>
          <th scope="col"><h6>{survey.postedBy}</h6></th>
          <th scope="col"></th>
      </tr>
    );
  return (
    <div>
        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Survey Name</th>
                <th scope="col">Posted By</th>
                <th scope="col">Time</th>
            </tr>
            </thead>
            <tbody>
            {listItems}
            </tbody>
        </table>
    </div>
  );
}

surveyList.propTypes = {
  surveys: PropTypes.array.isRequired,
};
