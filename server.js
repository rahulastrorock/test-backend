const express = require('express');
const connectDB = require('./db/conn');
require("dotenv").config() ; 
const userRoutes = require('./routes/userRoutes');
const cors = require('cors') ;

const app = express();
app.use(express.json()) ; 
app.use(cors())
const port = process.env.PORT | 5000;

connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})  

app.use('/users',userRoutes) ;

app.listen(port, () => {    
    console.log(`Example app listening at http://localhost:${port}`)
  })

