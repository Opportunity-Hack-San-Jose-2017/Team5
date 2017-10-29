'use strict';

let db;
const express = require('express');
const router = express.Router();
const mongo = require('../mongo');
const DATA_COLLECTION = 'userdetails';
const SURVEY_COLLECTION = 'surveydata';

mongo.connect((_db) => {
  db = _db;
  console.log("inside mongo connect", db);
});

router.get('/data', (req, res) => {
    console.log("Inside data");
    db.collection(DATA_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get user data.");
        } else {
            res.status(200).json(docs);
        }
    });
});



router.get('/data', (req, res) => {
    db.collection(SURVEY_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get user data.");
        } else {
            res.status(200).json(docs);
        }
    });
});

module.exports = router;
