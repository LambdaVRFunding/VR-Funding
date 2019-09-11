const router = require('express').Router();

const verify = require('../../auth/authenticate-middleware');

const Investors = require('./investor-model.js');
const Users = require('../users/user-model.js');
const Dreamers = require('../dreamers/dreamer-model.js');

router.get('/transactions', verify, async (req, res) => {
  const id = req.decodedToken.subject;
  
  try {
    const transactions = await Investors.getTransactions(id);

    if (transactions) {
      res.status(200).json(transactions);
    }
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

router.post('/transactions', verify, async (req, res) => {
  const id = req.decodedToken.subject;
  const project_id = req.body.project_id;
  const amount = req.body.amount_funded;
  
  try {
    const [transaction] = await Investors.addFundsToProj(id, project_id, amount);
    
    if (transaction) {
      const [getProj] = await Users.getProjById(project_id);

      if (getProj) {
        const oldCurrent = getProj.fund_current;
        const newCurrent = oldCurrent + amount;
  
        const updateProj = await Dreamers.updateProject(project_id, { fund_current: newCurrent });
        if (updateProj) {
          res.status(201).json(transaction);
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

router.get('/projects', verify, async (req, res) => {
  const id = req.decodedToken.subject;

  console.log(id)

  try {
    const projects = await Investors.getFundedProjects(id);

    

    if (projects) {
      res.status(200).json(projects);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;