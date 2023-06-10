const express = require('express');
const app = express();
const model = require("./models");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { Sequelize, DataTypes } = require('sequelize');


const {Client} = require('pg');
const User = require('./controller/user_game');


app.get('/', async (req, res) => {
    res.render('home');
    console.log('home');
})

app.get('/users', new User().find)
app.get('/users/:id', new User().findById)
app.post('/users', new User().create)
app.delete('/users', new User().delete)
app.put('/users/:id', new User().update)

app.get('/login', (req,res) =>{
    res.render('login');
})

app.get('/post', (req,res) =>{
    res.render('post');
})

app.post('/post', (req,res) =>{
    
})

app.get('/delete', (req,res) =>{
    res.render('delete')
})

app.delete('/delete', (req,res) =>{
    
})

app.get('/update', (req,res) =>{
    res.render('update')
})

app.get('/save', (req,res) =>{
    res.render('save')
})

model.sequelize.authenticate()
    .then(() => {
    app.listen(3030, () => {
      console.log("running at localhost:3030");
    })
    }).catch((err) => {
    console.log(err);
    });
    //dont forget to turn on postgres in terminal by typing psql
    //node filename to run
    //port db 5432

    //todo
    //make login page
    //join databases
    //make table pages that show databases
    //make form pages for crud