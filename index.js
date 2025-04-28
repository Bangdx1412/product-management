
// Su dung file env
require("dotenv").config()

const express = require('express');
const app = express()
const port = process.env.PORT;

// Dung pug
app.set('views','./views')
app.set('view engine','pug');

// Nhung file tinh css js image
app.use(express.static('public'))

// KẾT NỐI DATABASE
const database = require("./config/database")
database.connect();



// ******************ROUTE***************************
// Nhung route cua client
const route = require('./routes/client/index.route');
// Nhung route cua admin
const routeAdmin = require('./routes/admin/index.route');

// Chay route
routeAdmin(app);
route(app);
// *******************AND ROUTE*************************



app.listen(port,()=>{
    console.log(`Run port ${port}`);
    
})