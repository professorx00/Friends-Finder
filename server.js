const express = require("express");
const path = require("path");
const mysql = require("mysql")
const routes = require('./app/routing/router.js');

var app = express();
var PORT = 3000;

var database = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "friendfinder"
});
database.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + database.threadId);
});
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('/app'));

app.use('/', routes);


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});