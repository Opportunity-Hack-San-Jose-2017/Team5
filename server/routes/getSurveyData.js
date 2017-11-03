/* eslint-disable */
'use strict';

let db;
const express = require('express');
const moment = require('moment');
const router = express.Router();
const mongo = require('../mongo');
const uid = require('uid2');
const sentiment = require('node-sentiment');

// Collections
const DATA_COLLECTION = 'userdetails';
const SURVEY_DATA_COLLECTION = 'surveydata';
const USER_SURVEY_TAKEN = 'surveytakendata';
const GRAPHS_DATA = 'graphsData';
const SURVEY_RESPONSES = 'surveyResponses';
let RESULTS_DATA = {};

mongo.connect((_db) => {
    db = _db;
});

router.get('/data', (req, res) => {
    db.collection(DATA_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, 'Failed to get user data.');
        } else {
            res.status(200).json(docs);
        }
    });
});

// GET for questions being taken
router.get('/questions', (req, res) => {
    db.collection(SURVEY_DATA_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, 'Failed to get questions.');
        } else {
            res.status(200).json(docs);
        }
    });
});

// GET for questions being taken
router.get('/questions/:id', (req, res) => {
    var qid = req.params.id;
    db.collection(SURVEY_DATA_COLLECTION).find({"_id": {$eq: qid}}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, 'Failed to get questions.');
        } else {
            res.status(200).json(docs);
        }
    });
});

// POST for surveyTaken
router.post('/surveyTaken', (req, res) => {
    const surveyId = req.body.answers.surveyId;
    const result = {};
    result[surveyId] = req.body.answers;
    let responses;
    let questionRow = {};
    if(Object.keys(RESULTS_DATA).length === 0) {
        db.collection(GRAPHS_DATA).find({}).toArray(function(err, doc) {
            if(doc[0]) {
                RESULTS_DATA = doc[0]
            };
            insertResults(req, res);
        });
    } else {
        insertResults(req, res);
    }
    db.collection(SURVEY_RESPONSES).find({}).toArray(function(err, doc) {
        if(doc[0]) {
            responses = doc[0];
        } else {
            responses = {};
        }
        if(!responses[surveyId]) {
            questionRow.firstName = "";
            questionRow.lastName = "";
            result[surveyId]['questions'].forEach(question => {
                questionRow[question['qid']] = question['question']
            });
        }
        result[surveyId]['questions'].forEach(question => {
            result[surveyId][question['qid']] = question['answer']
        });
        delete result[surveyId]['questions'];
        delete result[surveyId]['teacherName'];
        delete result[surveyId]['surveyId'];
        if(responses[surveyId]) {
            responses[surveyId].push(result[surveyId]);
        } else {
            responses[surveyId] = [];
            responses[surveyId].push(questionRow);
            responses[surveyId].push(result[surveyId]);
        }
        db.collection(SURVEY_RESPONSES).update( {}, responses, { upsert: true }, function(err, doc) {
            if (err) {
                console.log( err.message, 'Failed to POST survey taken data.');
            } else {
                console.log('Updated SUccessfully');
            }
        });
    });

});

function insertResults(req, res){
    const surveyId = req.body.answers.surveyId;
    const result = {};
    result[surveyId] = req.body;
    if(!RESULTS_DATA.hasOwnProperty(surveyId)) {
        RESULTS_DATA[surveyId] = {};
    }

    result[surveyId].answers['questions'].forEach(question => {
        if(!RESULTS_DATA[surveyId].hasOwnProperty(question['qid'])) {
            RESULTS_DATA[surveyId][question['qid']] = {};
            RESULTS_DATA[surveyId][question['qid']]['type'] = question['questiontype'];
            RESULTS_DATA[surveyId][question['qid']]['question'] = question['question'];
            RESULTS_DATA[surveyId][question['qid']]['options'] = {};
        }
        if(question['questiontype'] !== 'text') {
            if(RESULTS_DATA[surveyId][question['qid']]['options'][question['answer']]) {
                RESULTS_DATA[surveyId][question['qid']]['options'][question['answer']] = RESULTS_DATA[surveyId][question['qid']]['options'][question['answer']] + 1;
            } else {
                RESULTS_DATA[surveyId][question['qid']]['options'][question['answer']] = 1
            }
        } else {

            /* Sentiment Analysis Starts */

            let ans = question['answer'];

            // Flow if user answered!
            if(ans) {
                let options = RESULTS_DATA[surveyId][question['qid']]['options'];
                let vote = sentiment(ans).vote;

                if (RESULTS_DATA[surveyId][question['qid']]['options'][vote]) {
                    RESULTS_DATA[surveyId][question['qid']]['options'][vote] = RESULTS_DATA[surveyId][question['qid']]['options'][vote] + 1;
                } else {
                    RESULTS_DATA[surveyId][question['qid']]['options'][vote] = 1
                }
            } else {
                //If no answer,

                if (RESULTS_DATA[surveyId][question['qid']]['options']['NA']) {
                    RESULTS_DATA[surveyId][question['qid']]['options']['NA'] = RESULTS_DATA[surveyId][question['qid']]['options']['NA'] + 1;
                } else {
                    RESULTS_DATA[surveyId][question['qid']]['options']['NA'] = 1
                }

            }

        }
    });
    //this will update the collection with the new data or inser the doc is it does not exist.
    db.collection(GRAPHS_DATA).update( {}, RESULTS_DATA, { upsert: true }, function(err, doc) {
        if (err) {
            console.log("error in graphs Data:", err.message );
            handleError(res, err.message, 'Failed to POST graphs data.');
        } else {
            res.status(201).json(doc);
        }
    });

}


router.post('/getAllSurveys', (req, res) => {

    if(!req.body || req.body.length == 0) {
        res.status(400).send('Need teacher name');
        return;
    }
    db.collection(SURVEY_DATA_COLLECTION).find({}).toArray(function(err, docs) {
        if(err){
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json(docs);
        }
    });
});

router.post('/updateSurvey', (req, res) => {

    if(!req.body || req.body.length == 0 || req.body._id) {
        res.status(400).send('Invalid survey id');
        return ;
    }

});

router.post('deleteSurvey', (req, res) => {
    if(!req.body || req.body.length == 0 || req.body._id) {
        res.status(400).send('Invalid survey id');
        return ;
    }

    db.collection(SURVEY_DATA_COLLECTION).deleteOne({ _id : req.body._id }, function(err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).send(result);
        }
    });
});

router.get('/download/:surveyKey', (req, res) => {
    let key = req.params.surveyKey;
    if (!key) {
        res.status(400).send('Invalid Survey key');
    }
    const query = {};
    query[key] = { $exists: true}
    db.collection(SURVEY_RESPONSES).find(query).toArray(function(err, docs) {
        if (err) {
            res.status(400).send(err);
        } else if (docs.length == 0) {
            res.status(204).send('No Results Found!!');
        } else {
            res.status(200).json(docs);
        }
    });

});

router.post('/postExcelData', (req, res) => {

    console.log('<<-- POST EXCEL DATA ->>');
    if(!req.body || req.body.length == 0) {
        resp.status(400).send('Invalid Survey Data');
        return;
        // handleError(res, 'Excel Parsing error', 'Size is either zero or undefined', 400);
    }
    const key = uid(5);
    let survey = {};
    survey._id = key;
    survey = Object.assign(survey, req.body);
    survey.isSurveyEnabled = survey.isSurveyEnabled ? survey.isSurveyEnabled : false;
    survey.postedOn =  moment().format('LLL');

    /*res.status(201).json(survey);*/
    db.collection(SURVEY_DATA_COLLECTION).insertOne(survey, function(err, doc) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.status(201).json(survey);
        }
    });
});

router.get('/surveyResults/:surveyKey', (req, res) => {
    if(!req.params.surveyKey) {
        res.status(400).send('Invalid Survey Key');
    }
    db.collection(GRAPHS_DATA).find({}).toArray(function(err, docs) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.status(200).json(docs);
        }
    });
});

module.exports = router;