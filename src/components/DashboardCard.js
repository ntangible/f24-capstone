// // src/components/DashboardCard.js
// import React from 'react';
// import '../styles/DashboardCard.css';

// const DashboardCard = ({ title, detail, onClick }) => (
//     <div className="card" onClick={onClick}>
//         <p>{title}</p>
//         <span className="arrow">→</span>
//         <p className="card-detail">{detail}</p>
//     </div>
// );

// export default DashboardCard;

// src/components/DashboardCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardCard.css';

const DashboardCard = ({ title, detail, link, isChart, isEarnings }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (link) {
            navigate(link);
        }
    };

    return (
        <div className="card" onClick={handleClick}>
            <p>{title}</p>
            <span className="arrow">→</span>
            {isChart ? (
                <div className="spending-chart-placeholder"></div>
            ) : isEarnings ? (
                <div>
                    <h3>{detail.split("\n")[0]}</h3>
                    <p>{detail.split("\n")[1]}</p>
                </div>
            ) : (
                <p className="card-detail">{detail}</p>
            )}
        </div>
    );
};

export default DashboardCard;
