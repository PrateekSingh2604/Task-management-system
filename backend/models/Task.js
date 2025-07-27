const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  status: { type: String, enum: ['Not started', 'In progress', 'Done'], default: 'Not started' },
  assignee: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  taskType: { type: String, enum: ['Feature request', 'Polish'], default: 'Feature request' },
  description: { type: String, required: true },
  createdBy: { type: String, required: true } 
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
