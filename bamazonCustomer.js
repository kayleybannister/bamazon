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
  });

//this will display all the products listed in the table
function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
  };