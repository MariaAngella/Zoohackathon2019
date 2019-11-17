/* require is a keyword used to use a package and below are the packages */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const mongodb = require("mongodb");

const app = express(); // now we have our express app

// middleware
app.set("view engine", "pug"); //setting the view engine as pug
app.set("views", path.join(__dirname, "views")); //there's a folder called views and this is how to get it
app.use(bodyParser.urlencoded({ extended: true })); //for geting the posted data from the form in the console/body and the output is json
// app.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: function(req, photo, cb) {
    cb(null, "uploads");
  },
  photoname: function(req, photo, cb) {
    cb(
      null,
      photo,
      photoname + "-" + Date.now() + path.extname(photo.originalname)
    );
  }
});

var upload = multer({
  storage: storage
});

//import routes
const landingpageRoute = require("./routes/landingpageroute");
const InformerRoute = require("./routes/informerroute");
const RangerRoute = require("./routes/rangerroute");
const RangerFbRoute = require("./routes/rangerfbroute");
const TouristRoute = require("./routes/touristroute");
const TouristfbRoute = require("./routes/touristfbroute");
const AdminRoute = require("./routes/adminroute");

app.use("/", landingpageRoute);
app.use("/informer", InformerRoute);
app.use("/ranger", RangerRoute);
app.use("/rangerfb", RangerFbRoute);
app.use("/tourist", TouristRoute);
app.use("/touristfb", TouristfbRoute);
app.use("/admin", AdminRoute);

/* mongoose db connection */
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/zooahackerthon");

/* creates documents in the db------------------------------------- name of the collection model(collection storage,schemaStructure)....takes on the structure of schema and the req.body(user data) into the Register collection */
//const Register = mongoose.model("Register", registerSchema);

/* listening for requests: the server */
app.listen(5000, function() {
  console.log("Express listening  on 5000");
});
