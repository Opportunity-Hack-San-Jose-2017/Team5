/* eslint-disable */
import React, { Component } from 'react';
import axios  from 'axios';
import NavBar from '../../components/NavBar';

import SurveyResults from './SurveyResults';



export default class ResultsPage extends Component { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.state = {
            surveyResults: {}
        };
    }

    componentDidMount() {
        const that = this;
        const key = window.location.pathname.split('/')[2];
        axios({
            method:'get',
            url: '/survey/surveyResults/' + key
        }).then( (response) => {
            console.dir(response.data)
            if (response.status === 200) {
                console.dir('axios call', response)
                response.data !== null ? this.setState({
                    surveyResults: response.data[key]
                }): console.log('No Results Available');
            } else {
                console.log('Something went wrong');
                console.log(response);
            }
        }).catch((error) => {
            console.log('Something went wrong');
            console.log(error);
        });
    };


    render() {
        return (
            <div>
                <NavBar />
                <SurveyResults  surveyResults={this.state.surveyResults}/>
            </div>
        );
    }
}