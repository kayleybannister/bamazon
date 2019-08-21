//variables to call the mysql and inquirer packages after downloading them
var mysql = require("mysql");
var inquirer = require("inquirer");

//connecting to database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "kayleypassword",
    database: "bamazon"
  });

//this will display that we are connected to the database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
    idSearch();
  });

//this will display all the products listed in the table
function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        //using a for loop to loop through the results from the table to make it look prettier
        for (var i = 0; i < res.length; i++)
        {
            console.log("Item ID: " + res[i].item_id);
            console.log("Product: " + res[i].product_name);
            console.log("Department: " + res[i].department_name);
            console.log("Price: $" + res[i].price);
            console.log("Quantity in Stock: " + res[i].stock_quantity + "\n");
        }
    });
  };

  //asking the user for Item ID input
function idSearch(){
    inquirer
    .prompt({
        name: "item_id",
        type: "input",
        message: "Please enter the item ID for the product you would like to buy\n"
    })
    .then(function(answer) {
    var query = "SELECT product_name, department_name, price FROM products WHERE ?";
    connection.query(query, { item_id: answer.item_id }, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++)                    
        {
            console.log("Product: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: " + res[i].price);
         }    
    });
    });
};

//need a way to re-run idsearch after each selection until the user decides they are ready to complete checkout
//creating function to ask user how many of the item that they want to purchase
//this code should deduct the stock quantity every time an order is placed
//if there is not enough product in stock, the terminal should read "Insufficient Quantity"
//if there IS enough product in stock, the terminal should display the total cost of their purchase