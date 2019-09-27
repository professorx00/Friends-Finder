const express = require("express");
const path = require("path");
const mysql = require("mysql")
const routes = require('express').Router();


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
routes.use(express.urlencoded({ extended: true }));
routes.use(express.json());
routes.use(express.static('public'));


routes.post('/addFriend', function (req, res) {
    let answers = req.body;
    let name = answers.name;
    let photo = answers.photo;
    let question = answers.questions
    let arrayAnswers = answers.questions.split(",")

    database.query("select filekey,answers from surveys", function (err, results) {
        if (err) throw err;
        let eachFriendArray = []
        let filekeys =[]
        for (let x = 0; x < results.length; x++) {
            let ans = results[x].answers.split(",");
            eachFriendArray.push(ans);
            filekeys.push(results[x].filekey);
        }
        
        let totalDiff = [];
        eachFriendArray.forEach((e)=>{ 
            let total = 0;
            for(let i=0;i<e.length;i++){
                let diff = Math.abs((parseInt(e[i]))-(parseInt(arrayAnswers[i])));
                
                total=total+diff;
            }
            totalDiff.push(total);
        })
        const smallest = totalDiff.reduce( ( min, cur ) => Math.min( min, cur ), Infinity );
        const fkeyIndex = totalDiff.indexOf(smallest);
        const smallestFkey = filekeys[fkeyIndex];
        database.query("select * from surveys where filekey=?",[smallestFkey],function(err,results2){
            if(err) throw err;
            database.query("INSERT INTO `surveys` (`name`,`photo`,`answers`) VALUES (?,?,?)",[name,photo,question],function(err){
                if(err) throw err;
                res.send(results2[0]);
            })
        })
    });
    
});