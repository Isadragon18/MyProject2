const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");


//Json Parser middleware
app.use(express.json());
//Serve Static file
app.use(express.static(path.join(__dirname, "public")));
//Logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} at ${new Date()}`);
    next();
});
//Root route
app.get("/", (req, res) => {
    res.send("My Week 2 API!");
});
//Route to serve the HTML file
app.get("/html", (req, res) => {
    res.sendFile(path.join(__dirname, "Intro.html"));
});
//User route for creating a new user
app.post("/user", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).send("Name and email are required.");
    res.send(`Hello, ${name}!`);
    //res.status(201).json({ message: `Hello, ${name}!` });
});
//User route for fetching user profile
app.get("/user/:id", (req, res) => {
    const userId = req.params.id;
    res.send(`User ${userId} profile.`);
});
//Listens to the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//Additional route for demonstration
app.get("/about", (req, res) => {
    res.send("This is the about page.");
});
