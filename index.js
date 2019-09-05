require('dotenv').config();

const server = require('./api/server');

const PORT = process.env.PORT || 4000;

server.listening(PORT, () => {
    console.log(`server listening on port ${PORT}.`);
})