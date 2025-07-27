import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, deleteTask, updateTask } from '../api';
import TaskList from '../components/TaskList';

const UserPanel = ({ username }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    taskName: '',
    status: 'Not started',
    assignee: '',
    dueDate: '',
    priority: 'Medium',
    taskType: 'Feature request',
    description: '',
    createdBy: username
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const { data } = await fetchTasks();
      setTasks(data.filter(task => task.assignee === username || task.createdBy === username));
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const handleCreate = async () => {
    const { taskName, status, assignee, dueDate, priority, taskType, description } = newTask;

    if (!taskName || !status || !assignee || !dueDate || !priority || !taskType || !description) {
      alert('Please fill all fields.');
      return;
    }

    try {
      await createTask(newTask);
      setNewTask({
        taskName: '',
        status: 'Not started',
        assignee: '',
        dueDate: '',
        priority: 'Medium',
        taskType: 'Feature request',
        description: '',
        createdBy: username
      });
      loadTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateTask(id, { status: newStatus });
      loadTasks(); 
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className='container'>
      <h2>User Panel - {username}</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          placeholder="Task Name"
          value={newTask.taskName}
          onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })}
        />
        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        >
          <option value="Not started">Not started</option>
          <option value="In progress">In progress</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          placeholder="Assignee"
          value={newTask.assignee}
          onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
        />
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={newTask.taskType}
          onChange={(e) => setNewTask({ ...newTask, taskType: e.target.value })}
        >
          <option value="Feature request">Feature request</option>
          <option value="Bug">Bug</option>
          <option value="Enhancement">Enhancement</option>
        </select>
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button onClick={handleCreate}>Assign Task</button>
      </div>

      <TaskList tasks={tasks} onDelete={handleDelete} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
};

export default UserPanel;
