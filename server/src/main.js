const server = require('./server');

const port = parseInt(process.env.PORT || 3000);
const mongoUri = process.env.MONGO_DB_URI;
server.runServer(port, mongoUri).catch(console.error);
