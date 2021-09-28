const express = require("express");
const app = express();
const mongoose = require('mongoose');

require('./config/config').config();
const users = require("./routes/api/users")
const articles = require("./routes/api/articles")

const {checkToken} = require("./middleware/auth");

app.use(express.json())
app.use(checkToken)
app.use('/api/users', users)
app.use('/api/articles', articles)

const mongoURI = process.env.DATABASE;
mongoose.connect(mongoURI, err => {
    if (err) throw err;
    console.log("Connected to MongoDB...")
})

const port = process.env.port || 3001
app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})

