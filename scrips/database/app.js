 
var express=require("express");
var bodyParser=require("body-parser");
 
const mongoose = require('mongoose');
const path = require('path');
mongoose.connect('mongodb+srv://manuel:px6GTna4g6jM8IVx@cluster0.hcanky9.mongodb.net/');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
 
var app=express()
 
 
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.post('/sign_up', function(req,res){
    var fullname = req.body.fullname;
    var username =req.body.username;
    var email = req.body.email;
    var password =req.body.password;
 
    var data = {
        "fullname":fullname,
        "username":username,
        "email":email,
        "password":password
    }
db.collection('User-Registrations').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
             
    });
         
    return res.redirect('index.html');
})
 
 
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../Interface/index.html'));
}).listen(3000);
 
 
console.log("server listening at port 3000");