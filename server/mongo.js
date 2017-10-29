"use strict";

let db;
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let ObjectID = mongodb.ObjectID;
const url = 'mongodb://demo:demo@ds239965.mlab.com:39965/csi';

exports.connect = function(callback){
    MongoClient.connect(url, function(err, _db){
        if (err) { throw new Error('Could not connect: '+err);
        }
        db = _db;
        console.log("Inside Mongo File");
        callback(db);
    });
};