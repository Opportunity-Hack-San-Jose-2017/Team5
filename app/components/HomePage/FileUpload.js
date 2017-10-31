/* eslint-disable */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import {Button, Modal} from 'react-bootstrap';
import ReactFileReader from 'react-file-reader';
import * as XLSX from 'xlsx';
import SurveyList from '../../components/HomePage/SurveyList';
import NavBar from '../../components/NavBar';


//let _surveyData = [];

class FileUpload extends Component {
  constructor(props) {
    super(props)

    this.state = {
      surveys: props.surveys,
      showModal: false,
      surveyName: '',
      surveyData: undefined
    };

    this.handleFiles = this.handleFiles.bind(this)
    this.saveSurvey = this.saveSurvey.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open = () => {
    this.setState({surveyName: ''});
    this.setState({surveyData: undefined});
    this.setState({ showModal: true });
  }

  close = () => {
    this.setState({ showModal: false });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFiles = (files) => {

    const reader = new FileReader();
    let that = this;
    reader.onload = function (e) {
      const fileData = reader.result;
      const workbook = XLSX.read(fileData, {
        type: 'binary',
      });
      const XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      const newJson = [];
      for(let k in XL_row_object) {
        let temp = {};
        for(let i = 0 ; i < Object.keys(XL_row_object[k]).length ; i++){
          temp[Object.keys(XL_row_object[k])[i].toString().toLowerCase().replace(/ +/g, "")] = XL_row_object[k][Object.keys(XL_row_object[k])[i]];
        }
        newJson.push(temp)
      }
      that.setState({
        surveyData: newJson
      });
    }
    reader.onerror = function (error) {
      console.log(error);
    };
    reader.readAsBinaryString(files[0]);
  }

  saveSurvey (e) {
    e.preventDefault();
    if (this.state.surveyData && this.state.surveyName !== '') {
       const that = this;
       this.setState({ showModal: false });
       const surveys = this.state.surveys;
       const surveyName = this.state.surveyName;
        axios.post('/survey/postExcelData', {
          surveyName: surveyName,
          surveyQuestions: {questions: this.state.surveyData},
          teacherName: 'Allison'
        }).then(function (response) {
            if (response.status === 201) {
              surveys.push(response.data)
              that.setState({ surveys: surveys });
            }
        }).catch(function (error) {
            console.log('Something went wrong at the server side');
            console.log(error);
        });
    } else {
      alert("Need both file and survey name to create the survey");
    }
  }

  render() {
    return(
      <div>
      <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Button
                bsStyle="primary"
                onClick={this.open}
              >  <span className="glyphicon glyphicon-plus"></span> Upload Survey </Button>
            </div>
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title bsStyle="custom">Upload Survey</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Enter Survey Name</label>
                      <input type="text" className="form-control" id="surveyName" placeholder="Enter survey name"  onChange={this.handleChange} name="survey-name" />
                    </div>
                    <div className="form-group ">
                      <label>Choose File</label>
                      <ReactFileReader handleFiles={this.handleFiles} fileTypes={['.xlsx', '.xls']}>
                        <button className="form-control btn-primary"><span className="glyphicon glyphicon-folder-open"></span> Browse...</button>
                      </ReactFileReader>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
                <Button onClick={this.saveSurvey} bsStyle="success">Save</Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="row">
            <SurveyList surveys={this.state.surveys}/>
          </div>
        </div>
      </div>
    )
  }

}

FileUpload.propTypes = {
    surveys: PropTypes.array.isRequired
}

export default FileUpload;