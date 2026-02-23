const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Create a Task model

// Fetch tasks assigned to the volunteer
router.get('/tasks/:volunteerId', async (req, res) => {
  const { volunteerId } = req.params;

  try {
    const tasks = await Task.find({ volunteer: volunteerId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks.', error: error.message });
  }
});

// Update task status
router.patch('/task/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found.' });

    task.status = status;
    await task.save();

    res.status(200).json({ message: 'Task status updated.', task });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task status.', error: error.message });
  }
});

module.exports = router;
