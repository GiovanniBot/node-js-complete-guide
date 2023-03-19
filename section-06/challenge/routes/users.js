const express = require('express');
const router = express.Router();
const usersData = require('./register');

router.get('/', (req, res, next) => {
    const users = usersData.users;
    res.render('users', {
        docTitle: 'Users List',
        users: users,
    });
});

module.exports = router;