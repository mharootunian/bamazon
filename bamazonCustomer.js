const mysql = require("mysql");
const inquirer = require("inquirer");

let db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bamazon'
});
 
db.connect();
 
db.query('SELECT * FROM products', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
 
db.end();