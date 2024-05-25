const express = require('express');
const router = express.Router();
const db=require( '../connection');


router.get('/api/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});
router.get('/api/tasks/:id', (req, res) => {
  const taskId= req.params.id;
   const query='SELECT * FROM tasks where id=?';
  db.query(query,[taskId] ,(err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});
router.post('/api/tasks', (req, res) => {
    const { title, description, due_date } = req.body;
  
    // Insert the task into the tasks table
    const query = 'INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)';
    db.query(query, [title, description, due_date], (err, result) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(201).json({ message: 'Task created successfully', taskId: result.insertId });
      }
    });
  });
  router.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const updatedTask = req.body; // Updated task data from the request body
  
    // Update the task with the provided ID in the database
    const query = 'UPDATE tasks SET title=?, description=?, due_date=? WHERE id=?';
    db.query(query, [updatedTask.title, updatedTask.description, updatedTask.due_date, id], (err, result) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json({ message: 'Task updated successfully' });
      }
    });
  });
  // DELETE: Delete a task by ID
router.delete('/tasks/:id', (req, res) => {
    const taskId= req.params.id;
  
    // Delete the task with the provided ID from the database
    const query = 'DELETE FROM tasks WHERE id=?';
    db.query(query, [taskId], (err, result) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json({ message: 'Task deleted successfully' });
      }
    });
  });

  

module.exports = router;
