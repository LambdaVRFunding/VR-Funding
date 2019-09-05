const express = require('express');

const router = express.Router();

router.use('/', (req, res) => {
  res.send(200);
})

module.exports = router;