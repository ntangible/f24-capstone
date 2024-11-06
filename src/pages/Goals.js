// src/pages/ViewGoals.js
import React from 'react';
import Sidebar from '../components/Sidebar';

const ViewGoals = () => {
    const goals = [
        { name: "New Phone", saved: "$200", target: "$1000" },
        { name: "Macbook", saved: "$1350", target: "$2000" },
        { name: "Washer", saved: "$5700", target: "$6000" },
        { name: "Vacation", saved: "$500", target: "$3000" },
    ];

    const cardStyle = {
        backgroundColor: '#FFFFFF',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: '18px',
        width: '250px',
        height: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        margin: '10px',
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1, padding: '20px', backgroundColor: '#1a1c2c' }}>
                <h1 style={{ color: '#79c2c2', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Your Goals</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {goals.map((goal, index) => (
                        <div key={index} style={cardStyle}>
                            {goal.name}
                            <div style={{ fontWeight: 'normal', fontSize: '16px', marginTop: '10px' }}>
                                Saved: {goal.saved}<br />
                                Target: {goal.target}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewGoals;
