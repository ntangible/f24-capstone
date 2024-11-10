// src/pages/Spending.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Spending.css';

const Spending = () => {
    const spendingData = [
        { description: "Groceries", amount: "$200" },
        { description: "Entertainment", amount: "$150" },
        { description: "Utilities", amount: "$100" },
    ];

    return (
        <div className="spending-container">
            <Sidebar />
            <div className="spending-content">
                <h1 className="spending-heading">Track Your Spending</h1>
                <div className="spending-cards">
                    {spendingData.map((item, index) => (
                        <div key={index} className="spending-card">
                            <p className="spending-description">{item.description}</p>
                            <p className="spending-amount">{item.amount}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Spending;
