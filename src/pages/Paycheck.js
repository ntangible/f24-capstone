// src/pages/Paycheck.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/Paycheck.css';

const Paycheck = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [paychecks, setPaychecks] = useState([]);

    useEffect(() => {
        // Check if there's new paycheck data in the location state
        if (location.state && location.state.newPaycheck) {
            setPaychecks((prevPaychecks) => [...prevPaychecks, location.state.newPaycheck]);
        }
    }, [location.state]);

    const handleAddPaycheck = () => {
        navigate('/add-paycheck');
    };

    return (
        <div className="paycheck-page">
            <Sidebar />
            <div className="paycheck-container">
                <h1 className="paycheck-heading">Your Paychecks</h1>
                <div className="paycheck-card add-card" onClick={handleAddPaycheck}>
                    <p className="paycheck-card-title">Add a New Paycheck</p>
                    <span className="paycheck-arrow">→</span>
                </div>
                {paychecks.map((paycheck, index) => (
                    <div key={index} className="paycheck-card">
                        <p className="paycheck-card-title">{paycheck.source}</p>
                        <p>Amount: {paycheck.amount}</p>
                        <p>Date: {paycheck.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Paycheck;
