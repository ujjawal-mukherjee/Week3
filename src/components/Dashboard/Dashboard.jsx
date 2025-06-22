import React from 'react';
import { useTheme } from '../../Context/ThemeContext';
import './Dashboard.css';

const Dashboard = () => {
    const { theme } = useTheme();

    return (
        <div className={`dashboard ${theme}`}>
            <h2>Dashboard Overview</h2>
            <div className="stats-container">
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p>1,234</p>
                </div>
                <div className="stat-card">
                    <h3>Revenue</h3>
                    <p>$12,345</p>
                </div>
                <div className="stat-card">
                    <h3>Tasks</h3>
                    <p>24/50</p>
                </div>
                <div className="stat-card">
                    <h3>Pending</h3>
                    <p>12</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;