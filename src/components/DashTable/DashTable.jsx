import React, { useState } from 'react';
import { useTheme } from '../../Context/ThemeContext';
import './DashTable.css';

const DataTable = () => {
    const { theme } = useTheme();
    const [data, setData] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Pending' },
    ]);

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    return (
        <div className={`data-table-container ${theme}`}>
            <h2>User Data</h2>
            <table className={`data-table ${theme}`}>
                <thead>
                    <tr>
                        <th onClick={() => requestSort('id')}>ID</th>
                        <th onClick={() => requestSort('name')}>Name</th>
                        <th onClick={() => requestSort('email')}>Email</th>
                        <th onClick={() => requestSort('status')}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>
                                <span className={`status-badge ${row.status.toLowerCase()}`}>
                                    {row.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;