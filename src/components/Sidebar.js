// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => (
    <div className="sidebar">
        <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/add-purchase">Add Purchase</Link></li>
            <li><Link to="/add-goal">Add Goals</Link></li>
            <li><Link to="/user-profile">Profile</Link></li>
            <li><Link to="/goals">View Goals</Link></li>
        </ul>
    </div>
);

export default Sidebar;
