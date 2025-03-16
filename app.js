const express = require("express");
const app = express();
const pages = require("./routes/pages");


app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); // Correct view path
app.use(express.static("public"));
app.use("/", pages);
app.use(express.static("public")); // Serves static files like images, CSS, etc.


app.listen(3000, () => console.log("Server running on http://localhost:3000"));
