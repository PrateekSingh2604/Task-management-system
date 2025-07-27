import React from 'react';

const TaskList = ({ tasks, onDelete, onUpdateStatus }) => {
  if (!tasks.length) return <p>No tasks available.</p>;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#90ee90'; 
      case 'In progress':
        return '#add8e6';
      case 'Not started':
        return '#d3d3d3'; 
      default:
        return 'white';
    }
  };

  return (
    <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Status</th>
          <th>Assignee</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Task Type</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task._id}>
            <td>{task.taskName}</td>
            <td style={{ backgroundColor: getStatusColor(task.status) }}>
              <select
                value={task.status}
                onChange={(e) => onUpdateStatus(task._id, e.target.value)}
                style={{
                  backgroundColor: getStatusColor(task.status),
                  border: 'none',
                  padding: '4px',
                  borderRadius: '4px',
                }}
              >
                <option value="Not started">Not started</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>
            </td>
            <td>{task.assignee}</td>
            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
            <td>{task.priority}</td>
            <td>{task.taskType}</td>
            <td>{task.description}</td>
            <td>
              <button onClick={() => onDelete(task._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
