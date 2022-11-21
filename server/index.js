const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const app = express();
// all routes
const authRoute = require("./routes/auth");

// connect to database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongodb connected");
    })
    .catch(err => {
        console.log("Mongodb disconnected", err);
    })

// middleware function
app.use(express.json());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(compression());
// setup the logger
app.use(morgan('common'));


// routes
app.use("/api/auth", authRoute);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Port " + port + " is working");
})