import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import UserPanel from './pages/UserPanel';
import Login from './pages/Login';
import AdminUsers from './pages/AdminUsers';
import './styles/App.css';

const ProtectedRoute = ({ element: Component, role, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return <Component {...rest} />;
};

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <nav>
        <Link to="/">Login</Link> 
        <Link to="/admin">Admin Panel</Link> 
        {user?.role === 'admin' && <Link to="/admin/users">Manage Users</Link>} 
        <Link to="/user">User Panel</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={<ProtectedRoute element={AdminPanel} role="admin" />}
        />
        <Route
          path="/admin/users"
          element={<ProtectedRoute element={AdminUsers} role="admin" />}
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute
              element={UserPanel}
              role="user"
              username={user?.username}  
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
