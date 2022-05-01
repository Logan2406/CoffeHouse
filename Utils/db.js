const express = require('express');
const app = express()
const mysql = require('mysql');


var mysqlConnection = mysql.createConnection({
    host: 'bdm5mjw0dpyyb3ydwsz4-mysql.services.clever-cloud.com',
    user: 'uffvitwnkzia1pn1',
    password: 'seRuBMaINRdegkom6EFv',
    database: 'bdm5mjw0dpyyb3ydwsz4',
    multipleStatements: true
    });
mysqlConnection.connect(async(err)=> {
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    });

    module.exports = mysqlConnection;