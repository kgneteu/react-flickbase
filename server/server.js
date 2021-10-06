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

app.use(express.static('client/build'))

if (process.env.NODE_ENV === 'production'){
  const path = require('path')
  app.get('/*',(req, res)=>{
      res.sendFile(path.resolve(__dirname,'../client','build','index.html'))
  })

}
const port = process.env.port || 3001
app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})

