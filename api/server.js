const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const DreamerRouter = require('../routes/dreamers/dreamer-routes');
const InvestorRouter = require('../routes/investors/investor-routes');
const Users = require('../routes/users/user-model.js');

const verify = require('../auth/authenticate-middleware');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
// server.use('/api/dreamers', DreamerRouter);
// server.use('/api/investors', InvestorRouter);

server.post('/register', async (req, res) => {
  const user = req.body;
  
  try {
    if (user.name && user.password && user.email) {

      const hash = bcrypt.hashSync(user.password, 10);
      user.password = hash;

      const addUser = await Users.addUser(user);

      if (addUser) {
        res.status(201).json({
          message: `Thank you ${user.name}. Your user had been created.`
        });
      }
    } else {
      res.status(400).json({
        message: 'All required fields not found'
      });
    }
  } catch(err) {
    res.status(500).json({
      error: err.message
    })
  }
});

server.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const [user] = await Users.findUser({ email });
    
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = genToken(user);
      res.status(200).json({
        message: `Welcome ${user.name}!`,
        token
      });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }    
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

server.get('/projects', verify, async (req, res) => {
  const type = req.decodedToken.type;
  const id = req.decodedToken.subject;

  try {
    if (type === 1) {
      const projects = await Users.getProjByUserId(id);
      
      if (projects) {
        res.status(200).json(projects);
      }
    } else {
      const projects = await Users.getProjects();

      if (projects) {
        res.status(200).json(projects);
      }
    }
  } catch(err) {
    res.status(500).json({
      error: err.message
    });
  }
});

server.get('/projects/:id', verify, async (req, res) => {
  const { id } = req.params;
  const userId = req.decodedToken.subject;
  const type = req.decodedToken.type;
  
  try {
    const [project] = await Users.getProjById({ id });
    
    if (type === 1) {
      if (project && project.dreamer_id === userId) {
        res.status(200).json(project);
      } else {
        res.status(401).json({ message: `Cannot access this project.` });
      }
    } else {
      res.status(200).json(project);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get('/', (req, res) => {
  res.send('Welcome to the VR Funding API!');
});

// Generate Token Middleware

function genToken(user) {
  const payload = {
    subject: user.id,
    username: user.email,
    type: user.type_id
  };

  const secret = secrets.jwtSecret;

  const options = {
    expiresIn: '3h'
  }

  return jwt.sign(payload, secret, options);
}

module.exports = server;
