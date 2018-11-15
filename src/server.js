const express = require('express');
// const bodyParser=require('body-parser');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'tollscatalog'
});
const app = express();

// app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    connection.connect();

    connection.query('SELECT * FROM tools', (error, results, fields) => {
        if (error) throw error;
        res.send(results);
        console.log(results);
    });
    connection.end();

});

app.listen(3000, function () {
    console.log('listening on: 3000')
});