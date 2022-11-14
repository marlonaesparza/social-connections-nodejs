require('dotenv').config({path: __dirname + '/../.env'});
require('./../database/index');


const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8004;
const connectionRouter = require('./api/connectionRouter');
const requestRouter = require('./api/requestRouter');


app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


app.use('/connections', connectionRouter);
app.use('/requests', requestRouter);


app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
