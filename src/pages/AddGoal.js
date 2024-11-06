// src/pages/AddGoal.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/AddGoal.css';

const AddGoal = () => (
    <div className="AddGoal-container">
        <Sidebar className="AddGoal-sidebar" />
        <div className="AddGoal-content">
            <div className="AddGoal-form-wrapper">
                <h1 className="AddGoal-title">Add a New Goal</h1>
                <form className="AddGoal-form">
                    <input 
                        type="text" 
                        placeholder="Goal Name" 
                        className="AddGoal-input"
                    />
                    <input 
                        type="number" 
                        placeholder="Amount" 
                        className="AddGoal-input"
                    />
                    <label className="AddGoal-label">
                        Choose a goal length: 
                        <select className="AddGoal-select">
                            <option value="long_term">Long Term</option>
                            <option value="short_term">Short Term</option>
                        </select>
                    </label>
                    <label className="AddGoal-label">
                        Priority (Between 1 and 3):
                        <input 
                            type="range" 
                            min="1" 
                            max="3" 
                            className="AddGoal-range"
                        />
                    </label>
                    <button 
                        type="submit" 
                        className="AddGoal-button"
                    >
                        Add Goal
                    </button>
                </form>
            </div>
        </div>
    </div>
);

export default AddGoal;
