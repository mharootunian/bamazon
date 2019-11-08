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
            viewLowInv();
            break;

        case "Add to Inventory":
            addStock();
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

function viewLowInv() {
    db.query('SELECT * FROM products WHERE stock_quantity < 5;', function (error, results, fields) {
        if (error)
            throw error;

        results.forEach((elem) => {
            console.log("=====Begin Item====");
            console.log(`Product Id: ${elem.item_id}\nProduct: ${elem.product_name}\nPrice: ${elem.price}\nStock Quantity: ${elem.stock_quantity}`);
        });

    });
    db.end();
}

function addStock() {
    let questions = [{
        type: "input",
        name: "itemId",
        message: "Please enter a stock ID."
    },
    {
        type: "input",
        name: "quantity",
        message: "Please enter a quanity to add ID."
    }];

    inquirer.prompt(questions).then(answers => {
        db.query(`SELECT (stock_quantity) FROM products WHERE item_id=${answers.itemId}`, function (error, results) {
            if (error)
                throw error;

            db.query(`UPDATE products SET stock_quantity=${parseFloat(answers.quantity) + parseFloat(results[0].stock_quantity)} WHERE item_id=${answers.itemId}`, function (error2, results2) {
                if (error2)
                    throw error2;
            })
       });
    }).catch((err) => {
        if (err)
            throw err;
    });

}