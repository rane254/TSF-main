const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

// Create an instance of the Express router
const router = express.Router();

const corsOptions = {
    origin: "http://localhost:4000",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));

// always define config path first
dotenv.config({ path: './config.env' });

// then define the conn file to avoid typo error
require('./db/conn');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname + '/public')));

// Import and use routes defined in 'router/auth.js'
app.use(require('./router/auth'));

// Define a route for the root path
app.get('/', (req, res) => {
    try {
        console.log('Handling root path request');
        res.sendFile(path.join(__dirname, '/../public/index.html'));
    } catch (error) {
        res.status(404).send('Resource not found!');
        console.log(error);
    }
});

// Parse incoming requests with JSON payloads
app.use(express.json());

// port no
const PORT = process.env.PORT;

// Define a middleware function
const middleware = (req, res, next) => {
    console.log('Hello my Middleware.');
    next();
}

// routes
// app.get('/', (req, res) => {
//     res.send('Hello world from the server.')
// });

// Use the router for all routes starting with '/app'
app.use('/app', router);

app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
})
