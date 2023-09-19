const mongoose = require("mongoose");
const mongooseURI = "mongodb://localhost:27017/";
const connectToMongo = () => {
  mongoose
    .connect(mongooseURI)
    .then(() => {
      console.log("Successfully Connected to Database");
    })
    .catch((err) => {
      console.log("Error Occured While connecting to Database", err);
    });
};

module.exports = connectToMongo;
