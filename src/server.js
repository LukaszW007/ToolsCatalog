const express = require('express');
// const bodyParser=require('body-parser');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'mysql.cba.pl',
    user: 'cowi',
    password: 'Cowi18',
    database: 'cowi'
});
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    connection.connect();

    connection.query('SELECT * FROM users', (error,results,fields)=>{if (error) throw error;
        res.send(results)});
    connection.end();

});

server.listen(3000, function () {
    console.log('listening on: 3000')
});