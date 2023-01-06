const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
    res.send(
        `<ul>
            <li>GiovanniBot</li>
            <li>laisouz4</li>
            <li>Josuske</li>
        </ul>`
    );
});

app.use('/', (req, res, next) => {
    res.send('<h1>Welcome to this fake site!</h1>');
});

app.listen(3000);