import React from 'react';

export default class surveyModal extends React.PureComponent {
  render() {
    return (
      <div className="survey-container">
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
          <span className="glyphicon glyphicon-plus"></span> Create A Survey</button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Create a Survey</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="file-loading">
                  <input id="inputb9" name="inputb9" type="file" accept=".xls,.xlsx" required />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" id="saveId" className="btn btn-primary" title="Your custom upload logic">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
