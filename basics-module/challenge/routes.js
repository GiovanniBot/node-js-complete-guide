const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    //Home
    if (url === '/') {
        res.write(`
            <html>
            <head>
                <title>Sign in</title>
            </head>
            <body>
                <h1>Welcome to my fake user register</h1>
                <hr>
                <form action="/create-user" method="POST">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" />
                    <button type="submit">Register</button>
                </form>
                <hr>
                <a href="/users" target="_blank">Click to see all users XD</a>
            </body>
            </html>
        `);
        return res.end();
    }

    //Create User Response
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const userName = parsedBody.split('=')[1];
            console.log(userName);
            fs.writeFile('userName.txt', userName, () => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    //All Users
    if (url === '/users') {
        res.write(`
            <html>
            <head>
                <title>Users</title>
            </head>
            <body>
                <h1>Welcome to my fake users DB</h1>
                <hr>
                <ul>
                    <li>GiovanniBot</li>
                    <li>laisouz4</li>
                    <li>Josuske</li>
                </ul>
            </body>
            </html>
        `);
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
};

module.exports = requestHandler;