/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import ReactFileReader from 'react-file-reader';
import * as XLSX from 'xlsx';
import SurveyList from '../../components/HomePage/SurveyList';

let _surveyData = [];

class FileUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      surveys: props.surveys
    }
    this.handleFiles = this.handleFiles.bind(this)
    this.saveSurvey = this.saveSurvey.bind(this)
  }

  handleFiles = (files) => {

    const reader = new FileReader();
    reader.onload = function (e) {
      const fileData = reader.result;
      const workbook = XLSX.read(fileData, {
        type: 'binary',
      });
      const XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      console.log(JSON.stringify(XL_row_object));
      const newJson = [];
      for(let k in XL_row_object) {
        let temp = {};
        for(let i = 0 ; i < Object.keys(XL_row_object[k]).length ; i++){
          temp[Object.keys(XL_row_object[k])[i].toString().toLowerCase().replace(/ +/g, "")] = XL_row_object[k][Object.keys(XL_row_object[k])[i]];
        }
        newJson.push(temp)
      }
      _surveyData = newJson;
      console.log('here: ' + _surveyData);
    }
    reader.onerror = function (error) {
      console.log(error);
    };
    reader.readAsBinaryString(files[0]);
  }

  saveSurvey (e) {
    e.preventDefault();
    let surveys1 = this.state.surveys;
    console.log(surveys1 + 'we reached here')
    surveys1.push({
      "title": "Survey1",
      "key": "5",
      "postedBy": "Allison",
      "postedOn": "Nov 1st, 2017"
    })
    console.log(surveys1)
    this.setState({ surveys: surveys1 })
  }

  render() {
    return(
      <div className="row">
        <div className="container">
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#uploadsurvey">
            <span className="glyphicon glyphicon-plus"></span> Create A Survey</button>
          <div className="modal fade" id="uploadsurvey" tabIndex="-1" role="dialog" aria-labelledby="uploadsurveyLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title" id="uploadsurveyLabel">Create a Survey</h1>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="file-loading row">
                    <div className="col-md-5">
                      <ReactFileReader handleFiles={this.handleFiles} fileTypes={['.xlsx', '.xls']}>
                          <input className="form-control" id="sel1" type="file" />
                      </ReactFileReader>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" id="saveId" className="btn btn-primary" title="Your custom upload logic" onClick={this.saveSurvey}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SurveyList surveys={this.state.surveys}/>
      </div>
    )
  }

}

FileUpload.propTypes = {
    surveys: PropTypes.array.isRequired
}

export default FileUpload;