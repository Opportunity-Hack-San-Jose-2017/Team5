/* eslint-disable */
'use strict';

let db;
const express = require('express');
const router = express.Router();
const mongo = require('../mongo');

// Collections
const DATA_COLLECTION = 'userdetails';
const SURVEY_DATA_COLLECTION = 'surveydata';
const USER_SURVEY_TAKEN = 'surveytakendata'

mongo.connect((_db) => {
  db = _db;
});

router.get('/data', (req, res) => {
    db.collection(DATA_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get user data.");
        } else {
            res.status(200).json(docs);
        }
    });
});

// GET for questions being taken
router.get('/questions', (req, res) => {
    db.collection(SURVEY_DATA_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get questions.");
        } else {
            res.status(200).json(docs);
        }
    });
});

// POST for surveyTaken
router.post('/surveyTaken', (req, res) => {
    console.log("inside Survey taken");
    console.log(req);
    if (!(req.body.firstName || req.body.lastName || req.body.grade || req.body.course || req.body.survey)) {
        handleError(res, "Invalid user input", "Mandatory fields must be filled.", 400);
    }


    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        grade: req.body.grade,
        course: req.body.course,
        survey: req.body.survey
    }

    db.collection(USER_SURVEY_TAKEN).insertOne(newUser, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to POST survey taken data.");
        } else {
            res.status(201).json(doc);
        }
    });

});

router.post('/postExcelData', (req, resp) => {

    console.log("<<-- POST EXCEL DATA ->>")

    if(!resp.body || resp.body.length == 0) { handleError(res, "Excel Parsing error", "Size is either zero or undefined", 400); }
    db.collection(SURVEY_DATA_COLLECTION).insertOne(resp.body, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to POST survey taken data.");
        } else {
            res.status(201).json(doc);
        }
    });
});

module.exports = router;
