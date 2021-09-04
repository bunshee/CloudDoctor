const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const errorHandler = require ('./middleware/error')

dotenv.config();
const port = process.env.PORT || 8000;


app.use(cors({origin:["http://localhost:3000"],
  credentials: true,}));
  
app.use(express.json());

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
},
(err) => {
  if (err) return console.error(err);
  console.log("Connected to MongoDB");
});


app.use("/auth", require("./routes/user.Routes"));
app.use("/private", require("./routes/private.Routes"));
app.use("/rendez-vous", require("./routes/appointement.Routes"))
app.use(errorHandler);
app.listen(port, function () {
  console.log(`express server is running on port ${port}`);
});
