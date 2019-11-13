// console.log('hello world')
/* trying to display content on a browser using express package */
const express = require("express"); // require is a keyword used to use a package i.e express
const app = express(); // now we have our express app
const path = require("path");
const bodyParser = require("body-parser"); //for geting the posted data from the form in the console

/* mongooseNode Js + MongoDB
MongoDB object modeling for node
Need it to connect our nodejs to our mongo database */
var mongoose = require("mongoose");

/* mongooseNode Js + MongoDB
MongoDB object modeling for node
Need it to connect our nodejs to our mongo database */
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");

/* for geting the posted data from the form in the console  */
app.use(bodyParser.urlencoded({ extended: true }));

/* setting the view engine as pug */
app.set("view engine", "pug");
/* there's a folder called views and the rest-----path.join(_dirname, 'views')--- is how to get it */
app.set("views", path.join(__dirname, "views"));

/* npm is  It is the default package manager for the JavaScript runtime environment Node.js */
//app.listen(3000)opened up a port 3000 on which our server will listen with the browser
app.listen(3000, function() {
  console.log("listening on 3000"); // console.log is good practice to show that the code is running
});



/* accessing registerform.pug...... get displays the content input in the query parameter*/
app.get("/register", (req, res) => {
  console.log('body', req.body)
  console.log("Query Params", req.query);
  res.render("registerform");
});


/* posting the form */
app.post("/register", (req, res) => {
  console.log("Form has been posted");
  console.log("body", req.body);
  console.log("Query Params", req.query);
  res.render("registerform");
  
});

/* posting to the new form */
app.post("/thanks", (req, res) => {
  
  // res.send(req.body);
  // res.send("Hello world");
  // res.send("Hello" + req.body.firstname);
  // res.render("cohort");
  res.render("cohort",{
    name: req.body.firstname,
    lastnamee: req.body.lastname
  });
});



/* Creating a Database Schema */
var nameSchema = new mongoose.Schema({
  firstname: String,
  lastname: String
});


/* writing an error page for a path/route that doesn't exist----should be last in the code coz it stops the rest of the code */

app.get("*", (req, res) => {
  res.send("Got an ERROR request at /user");
});
