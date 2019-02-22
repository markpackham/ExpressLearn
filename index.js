const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const moment = require("moment");
const app = express();

//Init middleware
app.unsubscribe(logger);

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

/*
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
*/

//Members API Routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
