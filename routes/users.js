const express = require('express');
const router = express.Router();
const db=require( '../connection');

router.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
