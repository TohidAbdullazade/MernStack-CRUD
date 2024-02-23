let mongoose = require("mongoose");
let mongoDBConnectionString = "mongodb://127.0.0.1:27017/CRUD";
mongoose
  .connect(mongoDBConnectionString)
  .then(() => {
    console.log("Connection to mongoDB was Success");
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = mongoDBConnectionString