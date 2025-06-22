import React from 'react';
import { useTheme } from '../../Context/ThemeContext';
import './Header.css';

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={`header ${theme}`}>
            <div className="header-left">
                <h1>Admin Dashboard</h1>
            </div>
            <div className="header-right">
                <button onClick={toggleTheme} className="theme-toggle">
                    {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                </button>
            </div>
        </header>
    );
};

export default Header;