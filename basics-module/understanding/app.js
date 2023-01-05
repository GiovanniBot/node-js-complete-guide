const http = require('http');
const routes = require('./routes');
const server = http.createServer(routes);

server.listen(3000, () => {
  console.log(`Server has started at port: ${port}.`);
});
