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

function dbConnection(SQLquery, result) {
    connection.connect();
    connection.query(SQLquery, (error, results, fields) => {
        if (error) throw error;
        result.send(results);
        console.log(results);
    });
    connection.end();
}

app.route('/tools')
    .get((req, res) => {
        dbConnection('SELECT * FROM tools', res)
    })
    .post((req, res) => {
        //req.body
        dbConnection('INSERT INTO `tools`(`id`, `set_name`, `description`) VALUES ([value-1],[value-2],[value-3])',res);
    });
app.get('/users', (req, res) => {
    dbConnection('SELECT * FROM users', res)
});
app.get('/borrow', (req, res) => {
    dbConnection('SELECT * FROM borrow', res)
});

app.listen(3000, function () {
    console.log('listening on: 3000')
});
