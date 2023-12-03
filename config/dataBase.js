const mongoose = require("mongoose");

const connectDataBase = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/admin")
    .then((data) => {
      console.log(`DataBase is connected on port ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = connectDataBase;
