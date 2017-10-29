'use strict';

let db;
const express = require('express');
const router = express.Router();
const mongo = require('../mongo');
const DATA_COLLECTION = 'userdetails';

mongo.connect((_db) => {
  db = _db;
  console.log("inside mongo connect", db);
});

router.get('/data', (req, res) => {
    console.log("Inside data");
    db.collection(DATA_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(docs);
        }
    });
});

// router.post('/data', (req, res) => {
//     db.collection(LOGIN_COLLECTION).find({ username: req.body.username }).toArray(function(err, docs) {
//         if (err) {
//             handleError(res, err.message, "Failed to get contacts.");
//         } else {
//             // res.status(200).json(docs);
//             // console.log("Docs I got"+JSON.stringify(docs));
//             // console.log("password I got"+JSON.stringify(req.body));
//             if(docs[0].password === req.body.password){
//                 res.status(200).json("Success");
//             } else {
//                 handleError(res, "Invalid user input", "Must provide a username, password or email.", 400);
//             }
//         }
//     });
// });

module.exports = router;
