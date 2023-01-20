const express = require('express');
const rootDir = require('./util/path');
const path = require('path');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

const app = express();

app.use(express.urlencoded( {extended: true} ));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use((req, res, next) => res.status(404).sendFile(path.join(__dirname, 'views', '404.html')));

app.listen(3000);