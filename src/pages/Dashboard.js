// src/pages/Dashboard.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardCard from '../components/DashboardCard';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const cardData = [
        {
            title: "Add a purchase",
            detail: "Last spent: $350 at Costco",
            link: "/add-purchase"
        },
        {
            title: "View your goals",
            detail: "$200 for New Phone\n$1350 for Macbook\n$5700 for Washer and 3 more.",
            link: "/goals"
        },
        {
            title: "Track your spending",
            detail: "",
            link: "/spending",
            isChart: true
        },
        {
            title: "Add a paycheck",
            detail: "Last added: $3500 on 9/30/24",
            link: "/add-paycheck"
        },
        {
            title: "You have made",
            detail: "$10,000\nsince joining Centsible!",
            isEarnings: true
        }
    ];

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <h1 className="heading">Dashboard</h1>
                <div className="cards">
                    {cardData.map((card, index) => (
                        <DashboardCard key={index} {...card} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
