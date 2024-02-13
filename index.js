const express = require('express');
const mongoose = require('mongoose')
const app = express();

// CONFIG
require('dotenv').config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

//Database
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('connected to mongo: ' + MONGO_URI);
    })
    .catch((err) => {
        console.log('Error connecting to mongo: ' + err);
    });


// DEPENDENCIES
const methodOverride = require('method-override')

// MIDDLEWARE
app.use(methodOverride('_method'))
app.use (express.static('public'))
app.use(express.urlencoded({extended: true}))


// ROUTES
app.get('/', (req, res) => {
    res.send('Hello Bread. Welcome to an Awesome App');
});

// BREADS ROUTES
app.use('/breads', require('./controllers/breads_controller'));

// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})

// LISTEN
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});
  

