const express = require('express');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const app = express();

app.use(express.urlencoded( {extended: true} ));

app.use(adminRouter, shopRouter);

app.listen(3000);