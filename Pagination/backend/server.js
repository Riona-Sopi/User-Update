const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const indexRoute = require('./routes/index.router.js');

//app
const app = express()


//DB
mongoose.connect(process.env.DATABASE,
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
        if (err) {
            console.log(err);
    
        } else {
            console.log("Connected to the database");
        }
    });

//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
//cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

app.use(express.static('public')); 
app.use('/uploads', express.static('uploads'));
//routes middleware


app.use("/", indexRoute);


//port
const port = process.env.PORT || 8000
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})