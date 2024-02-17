const mongoose = require("mongoose");

const connectToDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log("MongoDB connected with Server Successfully!!!");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectToDatabase;
