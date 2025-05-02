// Su dung file env
require("dotenv").config();

const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express();
const port = process.env.PORT;

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Nhúng file system ở config để lấy biến admin ra
const systemConfig = require("./config/system");

// Nhúng thư viện để làm thông báo
app.use(cookieParser("TUDIENVAOHEHE"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// Dung pug
app.set("views", "./views");
app.set("view engine", "pug");

// Nhung file tinh css js image
app.use(express.static("public"));

// KẾT NỐI DATABASE
const database = require("./config/database");
database.connect();

// Khai báo biến có phạm vi Toàn cục Tất cả các file pug đều nhận được nó
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// ******************ROUTE***************************
// Nhung route cua client
const route = require("./routes/client/index.route");
// Nhung route cua admin
const routeAdmin = require("./routes/admin/index.route");

// Chay route
routeAdmin(app);
route(app);
// *******************AND ROUTE*************************

app.listen(port, () => {
  console.log(`Run port ${port}`);
});
