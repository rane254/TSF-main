const mongoose = require('mongoose');
const express = require('express');
const app = express();

const DB = 'mongodb+srv://brijesh254:JaiBabaSwami@cluster0.fvbcb5m.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB).then(() => {
    console.log('DB Connection Successfull');
}).catch((err) = )

// Middlleware
const middleware = (req, res, next) => {
    console.log('Hello my Middleware.');
    next();
} 

app.get('/', (req, res) => {
    res.send('Hello world from the server.')
});
