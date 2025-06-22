import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import './Sidebar.css';

const Sidebar = () => {
    const { theme } = useTheme();

    return (
        <nav className={`sidebar ${theme}`}>
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/tables">Tables</Link></li>
                <li><Link to="/charts">Charts</Link></li>
                <li><Link to="/calendar">Calendar</Link></li>
                <li><Link to="/kanban">Kanban Board</Link></li>
            </ul>
        </nav>
    );
};

export default Sidebar;