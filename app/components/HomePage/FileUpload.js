/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import ReactFileReader from 'react-file-reader';
import * as XLSX from 'xlsx';
import SurveyList from '../../components/HomePage/SurveyList';

class FileUpload extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      surveys: props.surveys
    }
    console.log(this.state.surveys)
  }

  handleFiles = (files) => {
    console.log('We reached here');
    const surveys1 = this.state.surveys;
    const reader = new FileReader();
    reader.onload = function (e) {
      const fileData = reader.result;
      const workbook = XLSX.read(fileData, {
        type: 'binary',
      });
      const XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      console.log(JSON.stringify(XL_row_object));
    }
    reader.onerror = function (error) {
      console.log(error);
    };
    reader.readAsBinaryString(files[0]);
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
        <div className="col-md-2">
          <ReactFileReader handleFiles={this.handleFiles} fileTypes={['.xlsx', '.xls']}>
            <button className='btn btn-primary'>Upload Survey</button>
          </ReactFileReader>
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