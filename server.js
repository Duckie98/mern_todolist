const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const items = require("./routes/api/items");
const app = express();
const path = require("path");
// bodyParser Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/key").mongoURL;

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected ..."))
  .catch(e => console.log(e));

// Use Routes
app.use("/api/items", items);

// Serve static asset if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000; // process.env.PORT is for deployment environment
app.listen(port, () => console.log(`Server started on port ${port}`));
