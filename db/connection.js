var mysql = require('mysql')
const util = require('util')

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '0vM9v!WG3U%J',
    database: 'employees_db'
})

connection.connect();
connection.query = util.promisify(connection.query);
module.exports = connection;