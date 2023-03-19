const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const users = require('./routes/users');
const register = require('./routes/register');

app.use(bodyParser.urlencoded({extended: false}));

app.use(users);
app.use(register.routes);
app.use((req, res, next) => {
    res.status(404).render('404', {docTitle: 'Page not found'});
});

app.listen(3000);