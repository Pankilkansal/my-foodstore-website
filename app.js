const express = require("express");
const mongoose = require("mongoose");
const app = express();
const pages = require("./routes/pages");

// MongoDB connection (make sure DB name has no spaces!)
mongoose.connect('mongodb://127.0.0.1:27017/my_awesome_food_store', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("Error connecting to MongoDB: ", err));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static("public"));

// Use your routes
app.use("/", pages);

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
