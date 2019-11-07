const mysql = require("mysql");
const inquirer = require("inquirer");

///////////inquire
let questions = [{
    type: "input",
    name: "product_id",
    message: "Please enter the product id of the product you would like to purchase."
}];

inquirer.prompt(questions).then(answers => {
    console.log(JSON.stringify(answers.product_id));
});


let db = mysql.createConnection({
    host: 'localhost',
    user: 'meero',
    password: 'password',
    database: 'bamazon'
});


db.connect();

/*
let data = "";
db.query('SELECT * FROM products', function(error, results, fields) {
    if (error) 
        throw error;
    data = results;
    console.log('The solution is: ', results);
});

/*
//This will be when the user selects a product_id to purchase
db.query(`SELECT * FROM products WHERE product_id=${product_id}`, function(error, results, fields) {
    if (error) 
        throw error;
    data = results;
    console.log('The solution is: ', results);
});
*/




//db.end();
