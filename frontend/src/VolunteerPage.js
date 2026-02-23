import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/styles/Volunteer.css';

const VolunteerPage = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch assigned tasks on load
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  // Handle task status update
  const updateTaskStatus = async (taskId, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${taskId}`, { status });
      alert('Task status updated!');
      setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status } : t)));
    } catch (err) {
      alert('Error updating task status!');
    }
  };

  return (
    <div>
      <h1>Volunteer Page</h1>

      <h2>Assigned Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.foodType} - {task.status}
            <button onClick={() => updateTaskStatus(task.id, 'Delivered')}>Mark as Delivered</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteerPage;
