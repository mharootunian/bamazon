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


let ids = [];
db.query('SELECT * FROM products', function (error, results, fields) {
    if (error)
        throw error;

    results.forEach((elem) => {
        ids.push(elem.item_id);
        console.log("=====Begin Item====");
        console.log(`Product Id: ${elem.item_id}\nProduct: ${elem.product_name}\nPrice: ${elem.price}`);
    });

    productWhich();
});

let itemId = "";
function productWhich() {
    let questions = [{
        type: "list",
        name: "itemId",
        message: "Please enter the product id of the product you would like to purchase.",
        choices: ids
    }];

    inquirer.prompt(questions).then(answers => {
        console.log(JSON.stringify(answers.itemId));
        itemId = answers.itemId;
        productHowManyUnits();
    }).catch( (err) => {
        if (err)
            throw err;
    });
}


function productHowManyUnits() {
    let questions = [{
        type: "input",
        name: "quantity",
        message: "How many would you like to purchase?"
    }];

    inquirer.prompt(questions).then(answers => {
        db.query(`SELECT * FROM products WHERE item_id=${itemId}`, function(error, results) {
            if (error)
                throw error;

            if (results[0].stock_quantity > answers.quantity) {
                let newQ = results[0].stock_quantity - answers.quantity;
                db.query(`UPDATE products SET stock_quantity=${newQ} WHERE item_id=${itemId}`);
                console.log(`Thank you for your purchase! Your total was ${getTotal(results[0], answers.quantity)}`);
                db.end();
            } else {
                console.log("Insufficient quantity!");
                db.end();
            }
        });
    });
}

function getTotal(results, quantity) {
    return results.price * quantity;
}

