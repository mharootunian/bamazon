const mysql = require("mysql");
const inquirer = require("inquirer");


let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bamazon',
    port: 3388
});


db.connect();

let questions = [{
    type: "list",
    name: "action",
    message: "Please choose an action.",
    choices: ["Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
}];

inquirer.prompt(questions).then(answers => {
    console.log(answers.action)

    switch (answers.action) {
        case "Products for Sale":
            viewItems();
            break;

        case "View Low Inventory":
            console.log("PRIDUCTS FOR SALE")
            break;

        case "Add to Inventory":
            console.log("PRIDUCTS FOR SALE")
            break;

        case "Add New Product":
            console.log("PRIDUCTS FOR SALE")
            break;
    }
}).catch((err) => {
    if (err)
        throw err;
});

function viewItems() {
    db.query('SELECT * FROM products', function (error, results, fields) {
        if (error)
            throw error;

        results.forEach((elem) => {
            console.log("=====Begin Item====");
            console.log(`Product Id: ${elem.item_id}\nProduct: ${elem.product_name}\nPrice: ${elem.price}`);
        });

    });
    db.end();
}