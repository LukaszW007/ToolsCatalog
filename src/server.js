const express = require('express');
const connection = require('./db');
const bodyParser = require('body-parser');
const current_time = (function () {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getUTCDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
})();
console.log(current_time);

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

function dbConnection(SQLquery, result) {
    connection.query(SQLquery, (error, results) => {
        if (error) throw error;
        result.send(results);
        console.log(results);
        console.log(' connection is end in connection.query');
    });
    console.log('connection is end ');

}

/*
* Tools endpoints
*/

app.get('/tools', (req, res) => {
    dbConnection('SELECT * FROM tools', res);
    // res.send('TOOLS');
});

app.post('/tools/add', (req, res) => {//TODO
    const set_name = req.body.set_name;
    const description = req.body.description;
    console.log(set_name, description);
    dbConnection(`INSERT INTO tools(set_name,description) VALUES ("${set_name}", "${description}");`, res);
});

app.delete('/tools/delete',(req,res)=>{

});

/*
* User endpoints
*/

app.route('/users')
    .get((req, res) => {
        dbConnection('SELECT * FROM users', res)
    });
app.post('/users/add', (req, res) => {
    const user_id = req.body.user_id;
    const user_name = req.body.user_name;
    dbConnection(`INSERT INTO users(user_id, user_name) VALUES ("${user_id}","${user_name}");`, res)
});

/*
* Borrows endpoints
*/

app.get('/borrow', (req, res) => {
    dbConnection('SELECT * FROM borrow', res)
});

app.get('/borrow/check/:name', (req, res) => {
    const usersSetParamName = req.params.name;
    const usersSetName = usersSetParamName.substr(1);
    console.log(usersSetName);
    connection.query(`UPDATE borrow SET return_time="${current_time}" WHERE set_name="${usersSetName}" AND return_time IS null or return_time="";`, (error, results) => {//TODO PUT needed?
        if (error) throw error;
        console.log('to jest rezultat '+results.affectedRows);
        if (results.affectedRows===0){
            const set_name = req.body.set_name; //TODO can be here also req.params.set_name, depends on passing information. By address :set_name should be used req.params.set_name. Maybe has to be POST here
            const user_id = req.body.user_id;
            const borrow_time = current_time;
            const position = req.body.position;
            const info = req.body.info;
            dbConnection(`INSERT INTO borrow (set_name,user_id,borrow_time,position) VALUES ("${set_name}","${user_id}","${borrow_time}","${position}");`, res);
        }
    });
    console.log('to jest GET')
});
/*app.post('/borrow/took', (req, res) => {
    const set_name = req.body.set_name;
    const user_id = req.body.user_id;
    const borrow_time = current_time;//2016-04-10 23:50:40
    const position = req.body.position;
    const info = req.body.info;
    dbConnection(`INSERT INTO borrow (set_name,user_id,borrow_time,position) VALUES ("${set_name}","${user_id}","${borrow_time}","${position}");`, res);
});*/
/*app.put('/borrow/return', (req, res) => {
    const return_time = current_time;
    dbConnection()

});*/


app.listen(3000, function () {
    console.log('listening on: 3000')
});