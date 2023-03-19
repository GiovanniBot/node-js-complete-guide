const express = require('express');
const router = express.Router();

const users = [];

router.get('/add-user', (req, res, next) => {
    res.render('add-user', {
        docTitle: 'Add user',
    });
});

router.post('/add-user', (req, res, next) => {
    users.push({ name: req.body.name });
    res.status(200).redirect('/');
});

exports.routes = router;
exports.users = users;