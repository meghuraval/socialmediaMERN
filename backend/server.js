const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/userRoute");
const noteRoutes = require("./routes/noteRoute");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

mongoose.connect(process.env.DBURL);

app.use("/user", userRoutes);
app.use("/note", noteRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});
