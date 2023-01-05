const http = require("http");
const port = process.env.PORT || 3000;
const routes = require('./routes');

const server = http.createServer(routes);

server.listen(port, () => console.log(`Server has started at port: ${port}.`));