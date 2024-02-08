const express = require('express');
const app = express();

// CONFIG
require('dotenv').config();
const PORT = process.env.PORT;

// DEPENDENCIES
const methodOverride = require('method-override')

// MIDDLEWARE
app.use(methodOverride('_method'))
app.use (express.static)
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
  

