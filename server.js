//setting up express
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var cheerio = require("cheerio");
var request = require("request");
var PORT = process.env.PORT || 3000;

//setting up the bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//setting up the paths for the assets files
app.use(express.static(path.join(__dirname, "/public/")));

//setting up the routes from the controllers.js
require("./controllers/controllers.js")(app);

//connecting with handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//syncing with mongojs
const mongoose = require("mongoose");
mongoose.Promise = Promise;

//personal URL link
mongoose.connect("mongodb://heroku_xkb6hvpk:e9tjinqn63bvqpij8a4eddri2i@ds129090.mlab.com:29090/heroku_xkb6hvpk");
//***************************************************************************************************
var db = mongoose.connection;
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//setting up the PORT
app.listen(PORT);