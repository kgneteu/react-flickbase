const express = require("express");
const app = express();
const mongoose = require('mongoose');

const config = require('./config/config').config();

const users = require("./routes/api/users")
const articles = require("./routes/api/articles")
const files = require("./routes/api/files")

const {checkToken} = require("./middleware/auth");

app.use(express.json())
app.use(checkToken)
app.use('/api/users', users)
app.use('/api/articles', articles)
app.use('/api/files', files)

const mongoURI = config.database;

mongoose.connect(mongoURI, err => {
    if (err) throw err;
    console.log("Connected to MongoDB...")
})

app.use(express.static('client/build'))

if (process.env.NODE_ENV === 'production') {
    const path = require('path')
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })

}
const port = process.env.PORT || 3001
const server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(port, server_host, () => {
    console.log(`Server is listening on ${port} nad host ${server_host}`)
})

