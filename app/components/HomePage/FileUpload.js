/* eslint-disable */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import {Button, Modal, Pager} from 'react-bootstrap';
import ReactFileReader from 'react-file-reader';
import * as XLSX from 'xlsx';
import SurveyList from '../../components/HomePage/SurveyList';
import NavBar from '../../components/NavBar';
import SearchBar from '../../components/SearchBar';


//let _surveyData = [];

class FileUpload extends Component {
  constructor(props) {
    super(props)

    this.state = {
      surveys: [],
      filteredSurveys: [],
      showModal: false,
      surveyTitle: '',
      surveyData: undefined,
      isSurveyEnabled: false,
      hasResults: false
    };

    this.getSurveys('Allison');
    this.handleFiles = this.handleFiles.bind(this)
    this.saveSurvey = this.saveSurvey.bind(this)
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.filterSurvey = this.filterSurvey.bind(this);
    this.deleteSurvey = this.deleteSurvey.bind(this);
  }

  getSurveys (teacherName) {
     axios.post('/survey/getAllSurveys', {
      teacherName,
    }).then((response) => {
      if (response.status === 200) {
        // console.dir(response)
        this.setState({
          surveys: response.data,
          filteredSurveys: response.data
        });
      } else {
        alert('Something went wrong');
        console.log(response);
      }
    }).catch((error) => {
      alert('Something went wrong');
      console.log(error);
    });
  }

  open = () => {
    this.setState({surveyTitle: ''});
    this.setState({surveyData: undefined});
    this.setState({isSurveyEnabled: false});
    this.setState({hasResults: false});
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

  deleteSurvey (surveyId) {
    const canDelete = confirm('Are you sure you want to delete this survey?');
    if (!canDelete) {
      return;
    }
    axios.post('/survey/getAllSurveys', {
      teacherName,
    }).then((response) => {
      console.dir(response);
    }).catch((error) => {
      alert('Something went wrong');
      console.log(error);
    });
  }

  saveSurvey (e) {
    e.preventDefault();
    if (this.state.surveyData && this.state.surveyTitle !== '') {
       const that = this;
       this.setState({ showModal: false });
       const surveys = this.state.surveys;
       const surveyTitle = this.state.surveyTitle;
        axios.post('/survey/postExcelData', {
          surveyTitle: surveyTitle,
          surveyQuestions: this.state.surveyData,
          hasResults: this.state.hasResults,
          isSurveyEnabled: this.state.isSurveyEnabled,
          postedBy: 'Allison'
        }).then(function (response) {
            if (response.status === 201) {
              surveys.push(response.data)
              that.setState({ surveys: surveys,
                filteredSurveys: surveys
              });
            }
        }).catch(function (error) {
            alert('Something went wrong at the server side');
            console.log(error);
        });
    } else {
      alert("Need both file and survey name to create the survey");
    }
  }

  filterSurvey (surveyTitle) {
    let filteredSurveys = this.state.surveys;
     filteredSurveys = filteredSurveys.filter(function (survey) {
      if (survey.surveyTitle && survey.surveyTitle.includes(surveyTitle) || surveyTitle === '') {
        return survey;
      }
    });
    this.setState({
      filteredSurveys: filteredSurveys
    })

  }

  render() {
    return(
      <div>
      <NavBar />
        <div className="container">
          <div className="row">
            <SearchBar onSearchTermChange={this.filterSurvey} />
            <div className="col-md-offset-3 col-md-4">
              <Button
                bsStyle="primary"
                bsClass="btn btn-primary upload"
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
                      <label>Enter Survey Title</label>
                      <input type="text" className="form-control" id="surveyTitle" placeholder="Enter survey title"  onChange={this.handleChange} name="survey-title" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
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
            <SurveyList surveys={this.state.filteredSurveys} onSurveyDelete={this.state.deleteSurvey} />
          </div>
          <div className="row">
            <div className="col-md-12">
              <Pager>
                <Pager.Item previous href="#">&larr; Previous Page</Pager.Item>
                <Pager.Item next href="#">Next Page &rarr;</Pager.Item>
              </Pager>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

/*
FileUpload.propTypes = {
    surveys: PropTypes.array.isRequired
}
*/

export default FileUpload;