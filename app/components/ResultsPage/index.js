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
        console.log('Mounting survey results');
        axios({
            method:'get',
            url: '/survey/surveyResults/' + window.location.pathname.split('/')[2]
        }).then( (response) => {
            console.dir(response.data)
            if (response.status === 200) {
                console.dir('axios call', response)
                this.setState({
                    surveyResults: response.data
                });
            } else {
                alert('Something went wrong');
                console.log(response);
            }
        }).catch((error) => {
            alert('Something went wrong');
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