const express = require('express');
const app = express();

const path = require('path');


const mysql = require('mysql');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Connected!');
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});