// src/pages/Goals.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import GoalsCard from '../components/GoalsCard';
import AddGoal from './AddGoal';
import '../styles/Goals.css';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [showAddGoal, setShowAddGoal] = useState(false);

    // Function to add a new goal to the list
    const addGoal = (newGoal) => {
        setGoals([...goals, newGoal]);
        setShowAddGoal(false); // Hide the form after adding the goal
    };

    return (
        <div className="goals-container">
            <Sidebar />
            <div className="goals-content">
                <h1 className="goals-title">Your Goals</h1>
                
                {/* Show Add Goal button or AddGoal form conditionally */}
                <div className="add-goal">
                    {showAddGoal ? (
                        <AddGoal addGoal={addGoal} />
                    ) : (
                        <GoalsCard name={"Add a goal"} onClick={() => setShowAddGoal(true)} />
                    )}
                </div>
                
                <div className="goals-list">
                    {goals.map((goal, index) => (
                        <GoalsCard key={index} name={goal.name} saved={goal.saved} target={goal.target} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Goals;
