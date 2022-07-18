require('dotenv').config();
const express = require('express');
const { default: helmet } = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');

const userRoute = require('./routes/users')
const userAuth = require('./routes/auth')
const postRoute = require('./routes/posts')

const app = express();

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB Connected`))
  .catch(() => console.log(`Some problem with mongodb connection`));

    
//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.use('/api/users', userRoute)
app.use('/api/auth', userAuth)
app.use('/api/posts', postRoute)



app.listen(process.env.PORT, ()=>{
    console.log(`Server is litening to port : ${process.env.PORT}`)
})