const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const DreamerRouter = require('../routes/dreamers/dreamer-routes');
const InvestorRouter = require('../routes/investors/investor-routes');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/dreamers', DreamerRouter);
server.use('/api/investors', InvestorRouter);

module.exports = server;
