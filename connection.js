const mysql = require('mysql');

const db = mysql.createConnection({
 
    host: 'localhost',
    user: 'root',
    password: 'Tembo_113',
    database: 'tasks'
  });

  db.connect((err) => {
    if (err) {
      console.error('MySQL connection error:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });
  module.exports=db;