const productRoute = require("./product.route")
const homeRoute = require("./home.route")

module.exports = (app)=>{
// Route
app.use('/',homeRoute)

app.use('/products',productRoute)

}