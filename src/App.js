import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddGoal from './pages/AddGoal';
import AddPurchase from './pages/AddPurchase';
import UserProfile from './pages/UserProfile';
import Goals from './pages/Goals';
import Paycheck from './pages/Paycheck';
import AddPaycheck from './pages/AddPaycheck';
import Spending from './pages/Spending';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/add-goal' element={<AddGoal />} />
                <Route path='/add-purchase' element={<AddPurchase />} />
                <Route path='/user-profile' element={<UserProfile />} />
                <Route path='/goals' element={<Goals />} />
                <Route path='/paycheck' element={<Paycheck />} />
                <Route path='/add-paycheck' element={<AddPaycheck />} />
                <Route path='/spending' element={<Spending />} />
            </Routes>
        </Router>
    );
}

export default App;
