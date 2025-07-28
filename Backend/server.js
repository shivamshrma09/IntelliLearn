const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');
const port = process.env.PORT || 1000;
const server = http.createServer(app);

initializeSocket(server);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});