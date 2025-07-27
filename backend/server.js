const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use('/api/tasks', taskRoutes);

const createAdmin = async () => {
  const adminExists = await User.findOne({ username: 'admin' });
  if (!adminExists) {
    await User.create({ username: 'admin', password: 'admin123', role: 'admin' });
    console.log('Default admin created: admin/admin123');
  }
};
createAdmin();

app.listen(5000, () => console.log("Server running on port 5000"));
