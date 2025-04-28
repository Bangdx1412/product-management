
const express = require('express');
// Connect database
const database = require("./config/database")
// Su dung file env
require("dotenv").config()
database.connect();

// Nhung route
const route = require('./routes/client/index.route');
const app = express()
const port = process.env.PORT;

// Dung pug
app.set('views','./views')
app.set('view engine','pug');

// Nhung file tinh css js image
app.use(express.static('public'))

route(app);

app.listen(port,()=>{
    console.log(`Run port ${port}`);
    
})