require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
 
// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const locals = {
        title : "Nodejs",
        description : "Free NodeJs User Management System"
    }
    res.render('index', locals);
});

app.listen(port, ()=> {
  console.log(`App listeing on port ${port}`)
});