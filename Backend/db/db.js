const mongoose = require("mongoose");

function connectToDatabase() {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.error("DB Connection Error:", err);
      // Use a fallback connection string if the main one fails
      mongoose
        .connect("mongodb://127.0.0.1:27017/intellilearn", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 5000
        })
        .then(() => {
          console.log("Connected to database using fallback connection");
        })
        .catch((err) => {
          console.error("Fallback DB Connection Error:", err);
          process.exit(1);
        });
    });
}

module.exports = connectToDatabase;
