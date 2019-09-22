const express = require("express");
const path = require("path");
const mysql = require("mysql")

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
app.use(express.static('public'));


app.post('/addFriend',function(req,res){
    let answers = req.body;
    let name=answers.name;
    let photo=answers.photo;
    let question=answers.questions
    let arrayAnswers =answers.questions.split(",")
    
    database.query("select filekey,answers from surveys",function(err,results){
        if(err) throw err;
        for(let x = 0;x<res.length;x++){
            let ans = results[x].answers.split(",");
        };
        console.log("successful")
        res.sendStatus(201)
    })
    // database.query("INSERT INTO `surveys` (`name`,`photo`,`answers`) VALUES (?,?,?)",[name,photo,question],function(err,results){
    //     if(err) throw err;
    //     res.send(true)
    // })
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});