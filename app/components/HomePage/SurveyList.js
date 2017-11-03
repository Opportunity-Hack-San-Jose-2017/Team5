
/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import axios from 'axios';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

class SurveyList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { surveys: props.surveys }
    }

    delete = (id) => {
        const surveyList = this.state.surveys
        const newSurveyList = []
        for(survey in SurveyList) {
            if (survey.id !== id){
                newSurveyList.push(survey)
            }
        }
        this.setState({
            surveys : newSurveyList
        })
    }

    downloadResults = (e) => {
    const surveyKey = e.target.id;
    axios({
        method:'get',
        url: '/survey/download/' + surveyKey
    }).then(function (response) {
        if (response.status == 200)
        {
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(response.data);
            const ws_name = "Survey_Results";
            XLSX.utils.book_append_sheet(wb, ws, ws_name);
            const wopts = { bookType:'xlsx', bookSST:false, type:'binary' };

            var wbout = XLSX.write(wb, wopts);

            function s2ab(s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }

            /* the saveAs call downloads a file on the local machine */
            FileSaver.saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "test.xlsx");
        }
    })
        .catch(function (error) {
            console.log('cusom error ' + error);
        });
    }

    SurveyItems = this.state.surveys.map((survey) => {
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
                    <button className="btn btn-warning survey-btn btn-sm" onClick={this.delete(survey._id)}>Remove</button>
                    {
                        survey.hasResults ? null : <button  className="btn btn-success  survey-btn btn-sm" id={survey._id} onClick={downloadResults}>Download Results</button>
                    }
                    <Link to={"/results/" + survey._id} className="btn btn-default btn-sm survey-btn">View Results</Link>
                </div>
            </div>
        </div>
    );
});

    render() {
        return (
            <div className="col-md-12">
                { this.state.surveys.length == 0 ? <div className="media">
                    <div className="media-body">
                        <div className="col-lg-12">
                            <h1>No survey result found</h1>
                        </div>
                    </div>
                </div> : SurveyItems }
            </div>
        );
    }
}

// const SurveyList = (props) => {
//
//     function handleSwitch(e) {
//         console.log('The link was clicked.');
//     }
//
//     function downloadResults(e) {
//         const surveyKey = e.target.id;
//         axios({
//             method:'get',
//             url: '/survey/download/' + surveyKey
//         }).then(function (response) {
//             if (response.status == 200)
//             {
//                 const wb = XLSX.utils.book_new();
//                 const ws = XLSX.utils.json_to_sheet(response.data);
//                 const ws_name = "Survey_Results";
//                 XLSX.utils.book_append_sheet(wb, ws, ws_name);
//                 const wopts = { bookType:'xlsx', bookSST:false, type:'binary' };
//
//                 var wbout = XLSX.write(wb, wopts);
//
//                 function s2ab(s) {
//                     var buf = new ArrayBuffer(s.length);
//                     var view = new Uint8Array(buf);
//                     for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
//                     return buf;
//                 }
//
//                 /* the saveAs call downloads a file on the local machine */
//                 FileSaver.saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "test.xlsx");
//             }
//         })
//         .catch(function (error) {
//             console.log('cusom error ' + error);
//         });
//     }
//
//     const SurveyItems = props.surveys.map((survey) => {
//         return (
//             <div className="media well" key={survey._id}>
//                 <div className="media-body">
//                     <div className="col-md-1">
//                         <label className="switch" title="Enable Quiz">
//                             <input type="checkbox" defaultChecked={survey.isSurveyEnabled} onChange={handleSwitch} />
//                             <div className="slider round"></div>
//                         </label>
//                     </div>
//                     <div className="col-md-6">
//                         <h3 style={{marginTop: '10px'}}>{survey.surveyTitle}</h3>
//                         <ul className="list-inline list-unstyled">
//                             <li>
//                                 <span><i className="glyphicon glyphicon-calendar"></i> {survey.postedOn}</span>
//                             </li>
//                             <li>|</li>
//                             <li><span><i className="glyphicon glyphicon-user"></i></span>   {survey.postedBy} </li>
//                             <li>|</li>
//                             <li><span><i className="glyphicon glyphicon-barcode"></i></span><b style={{cursor: 'pointer'}}>    {survey._id}</b></li>
//                         </ul>
//                     </div>
//                     <div className="col-md-5">
//                         <button className="btn btn-warning survey-btn btn-sm" data-tag={survey._id}  >Remove</button>
//                         {
//                             survey.hasResults ? null : <button  className="btn btn-success  survey-btn btn-sm" id={survey._id} onClick={downloadResults}>Download Results</button>
//                         }
//                         <Link to={"/results/" + survey._id} className="btn btn-default btn-sm survey-btn">View Results</Link>
//                     </div>
//                 </div>
//             </div>
//         );
//     });
//
// }

SurveyList.propTypes = {
    surveys: PropTypes.array.isRequired
}

export default SurveyList;