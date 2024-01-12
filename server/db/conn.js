const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
    console.log('Databse connection successfully.');
}).catch((error) => {
    console.log('Database connection unsuccessfully.')
})