// src/pages/AddPaycheck.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/AddPaycheck.css';

const AddPaycheck = () => {
    const navigate = useNavigate();
    const [source, setSource] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPaycheck = { source, amount, date };
        
        // Navigate back to Paycheck.js and pass the newPaycheck data
        navigate('/paycheck', { state: { newPaycheck } });
    };

    return (
        <div className="add-paycheck-page">
            <Sidebar />
            <div className="add-paycheck-container">
                <div className="add-paycheck-form-wrapper">
                    <h1 className="add-paycheck-heading">Add a New Paycheck</h1>
                    <form onSubmit={handleSubmit} className="add-paycheck-form">
                        <label className="add-paycheck-label">
                            Source:
                            <input
                                type="text"
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                                className="add-paycheck-input"
                                placeholder="Paycheck Source"
                                required
                            />
                        </label>
                        <label className="add-paycheck-label">
                            Amount:
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="add-paycheck-input"
                                placeholder="Enter paycheck amount"
                                required
                            />
                        </label>
                        <label className="add-paycheck-label">
                            Date:
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="add-paycheck-input"
                                required
                            />
                        </label>
                        <button type="submit" className="add-paycheck-button">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPaycheck;
