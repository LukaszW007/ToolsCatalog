const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net',
    user: 'sql7266046',
    password: 'PXdpnYC2rp',
    database: 'sql7266046'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
